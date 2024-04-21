import singlestoredb as sdb
import flask
import base64
from PIL import Image
import io
from flask_cors import CORS
import random

app = flask.Flask(__name__)
CORS(app, resources={r"/proposals": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/new_proposal": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/requests": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/user_info/1": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/user_info/2": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/user_info/3": {"origins": "http://localhost:3000"}})

StatusCodes = {
    'success': 200,
    'api_error': 400,
    'internal_error': 500
}

def db_connection():
    db = sdb.connect(
        host='svc-3482219c-a389-4079-b18b-d50662524e8a-shared-dml.aws-virginia-6.svc.singlestore.com', 
        port='3333', 
        user='toolbox_guy', 
        password='49um3KRACOdEtPQP7q03X8kpW68nIDnf', 
        database='toolboxDB_fa2a4'
    )
    
    return db

@app.route('/')
def landing_page():
    return """

    DB Toolbox
    <br/>
    """
    

@app.route("/create_user", methods=['POST'])
def create_user():
    payload = flask.request.get_json()
    
    conn = db_connection()
    cur = conn.cursor()

    if 'username' not in payload:
        response = {'status': StatusCodes['api_error'], 'results': 'id value not in payload'}
        return flask.jsonify(response)

    # parameterized queries, good for security and performance
    statement = 'INSERT INTO utilizador VALUES (%s, %s, %s, %s, %s)'
    #values = (1, '2024-04-20', True, 1, "Martelo do José", "Martelo", imageData, "balls", 1.00, 1)
    #values = (2, '2024-04-20', False, 2, "Martelo do Chico", "Martelo", image, "balls", 1.50, 2)
    values = (payload['id'], payload['name'], payload['username'], payload['location'], payload['password'])

    try:
        cur.execute(statement, values)

        # commit the transaction
        conn.commit()
        user = payload['username']
        response = {'status': StatusCodes['success'], 'results': f'Inserted user {user}'}

    except (Exception, sdb.DatabaseError) as error:
        response = {'status': StatusCodes['internal_error'], 'errors': str(error)}

        # an error occurred, rollback
        conn.rollback()

    finally:
        if conn is not None:
            conn.close()

    return flask.jsonify(response)


@app.route("/user_info/<id>", methods=['GET'])
def get_user(id):
    conn = db_connection()
    cur = conn.cursor()
    
    try:
        statement = """select name, username, location
                    from utilizador
                    where id = %s"""
        
        cur.execute(statement, (id,))
        
        rows = cur.fetchall()
        
        row = rows[0]
        results = {
            "name": row[0],
            "username": row[1],
            "location": row[2]
        }
                
        response = {'status': StatusCodes['success'], 'results': results}
        
            
    except (Exception, sdb.DatabaseError) as error:
        response = {'status': StatusCodes['internal_error'], 'errors': str(error)}
        
    finally:
        if conn is not None:
            conn.close()
    
    return flask.jsonify(response)


@app.route("/new_tool", methods=['POST'])
def create_tool():
    payload = flask.request.get_json()
    conn = db_connection()
    cur = conn.cursor()

    if 'id' not in payload:
        response = {'status': StatusCodes['api_error'], 'results': 'id value not in payload'}
        return flask.jsonify(response)
    
    id = payload['id']
    ferramenta_type = payload['type']
    brand = payload['brand']
    image = payload['image']
    price = payload['price']
    
    with open(image, "rb") as img_file:
       imageData = img_file.read()
       
    statement = "INSERT INTO ferramenta VALUES(%s, %s, %s, %s, %s)"
    values = (id, ferramenta_type, imageData, brand, price)
       
    try:
        cur.execute(statement, values)

        # commit the transaction
        conn.commit()
        response = {'status': StatusCodes['success'], 'results': f'Inserted tool'}

    except (Exception, sdb.DatabaseError) as error:
        response = {'status': StatusCodes['internal_error'], 'errors': str(error)}

        # an error occurred, rollback
        conn.rollback()

    finally:
        if conn is not None:
            conn.close()

    return flask.jsonify(response)
    
    
    
# Coloca uma proposta
@app.route("/new_proposal", methods=['POST'])
def create_proposal():
    payload = flask.request.get_json()

    conn = db_connection()
    cur = conn.cursor()

    if 'utilizador_id' not in payload:
        response = {'status': StatusCodes['api_error'], 'results': 'id value not in payload'}
        return flask.jsonify(response)

    id = random.randint(2,1000)
    date_start = payload['date_start']
    ferramenta_id = payload['ferramenta_id']
    utilizador_id = payload['utilizador_id']

    # parameterized queries, good for security and performance
    statement = 'INSERT INTO oferta VALUES (%s, %s, %s, %s, %s)'
    #values = (1, '2024-04-20', True, 1, "Martelo do José", "Martelo", imageData, "balls", 1.00, 1)
    #values = (2, '2024-04-20', False, 2, "Martelo do Chico", "Martelo", image, "balls", 1.50, 2)
    values = (id, date_start, 1, ferramenta_id, utilizador_id)

    try:
        cur.execute(statement, values)
        cur.execute("INSERT INTO emprestimo_ferramenta_toolbox VALUES (%s, %s)", (id, 1))

        # commit the transaction
        conn.commit()
        response = {'status': StatusCodes['success'], 'results': f'Inserted proposal'}

    except (Exception, sdb.DatabaseError) as error:
        response = {'status': StatusCodes['internal_error'], 'errors': str(error)}

        # an error occurred, rollback
        conn.rollback()

    finally:
        if conn is not None:
            conn.close()

    return flask.jsonify(response)


@app.route("/new_request", methods=['POST'])
def create_request():
    payload = flask.request.get_json()

    conn = db_connection()
    cur = conn.cursor()

    if 'utilizador_id' not in payload:
        response = {'status': StatusCodes['api_error'], 'results': 'id value not in payload'}
        return flask.jsonify(response)

    id = payload['id']
    date_start = payload['date_start']
    ferramenta_id = payload['ferramenta_id'] 
    utilizador_id = payload['utilizador_id']
    
    # parameterized queries, good for security and performance
    statement = 'INSERT INTO pedido VALUES (%s, %s, %s, %s, %s)'
    #values = (1, '2024-04-20', True, 1, "Martelo do José", "Martelo", imageData, "balls", 1.00, 1)
    #values = (2, '2024-04-20', False, 2, "Martelo do Chico", "Martelo", image, "balls", 1.50, 2)
    values = (id, date_start, 1, ferramenta_id, utilizador_id)

    try:
        cur.execute(statement, values)

        # commit the transaction
        conn.commit()
        response = {'status': StatusCodes['success'], 'results': f'Inserted request'}

    except (Exception, sdb.DatabaseError) as error:
        response = {'status': StatusCodes['internal_error'], 'errors': str(error)}

        # an error occurred, rollback
        conn.rollback()

    finally:
        if conn is not None:
            conn.close()

    return flask.jsonify(response)

# Todas as propostas
@app.route("/proposals")
def get_all_proposals():
    conn = db_connection()
    cur = conn.cursor()
    
    try:
        cur.execute("""select oferta.id, ferramenta_id, ferramenta_type, brand, price, utilizador_id, date_start, location, photo
                    from oferta, ferramenta, emprestimo_ferramenta_toolbox as t, toolbox
                    where oferta.id = t.oferta_id and toolbox.id = t.toolbox_id and isProposal = 1 and ferramenta_id = ferramenta.id;""")
        
        rows = cur.fetchall()
        
        results = []
        
        
        for row in rows:
            #print(row)
            content = {
                "id": int(row[0]), 
                "ferramenta_id": int(row[1]), 
                "ferramenta_type": row[2],
                "ferramenta_brand": row[3],
                "ferramenta_price": float(row[4]),
                "utilizador_id": int(row[5]),
                "date_start": row[6],
                "location": row[7],
                "ferramenta_photo": base64.b64encode(row[8]).decode('utf-8')
                #"ferramenta_photo": row[8]    
            }
            
            results.append(content)
        
        response = {'status': StatusCodes['success'], 'results': results}

            
    except (Exception, sdb.DatabaseError) as error:
        response = {'status': StatusCodes['internal_error'], 'errors': str(error)}
        
    finally:
        if conn is not None:
            conn.close()
            
    return flask.jsonify(response)

@app.route("/requests")
def get_all_request():
    conn = db_connection()
    cur = conn.cursor()
    
    try:
        cur.execute("""select pedido.id, ferramenta_id, ferramenta_type, brand, price, utilizador_id, date_start, photo
                    from pedido, ferramenta
                    where isProposal = 1 and ferramenta_id = ferramenta.id;""")
        
        rows = cur.fetchall()
        
        results = []
        
        
        for row in rows:
            #print(row)
            content = {
                "id": int(row[0]), 
                "ferramenta_id": int(row[1]), 
                "ferramenta_type": row[2],
                "ferramenta_brand": row[3],
                "ferramenta_price": float(row[4]),
                "utilizador_id": int(row[5]),
                "date_start": row[6],
                "ferramenta_photo": base64.b64encode(row[7]).decode('utf-8')
                #"ferramenta_photo": row[8]    
            }
            
            results.append(content)
        
        response = {'status': StatusCodes['success'], 'results': results}

            
    except (Exception, sdb.DatabaseError) as error:
        response = {'status': StatusCodes['internal_error'], 'errors': str(error)}
        
    finally:
        if conn is not None:
            conn.close()
            
    return flask.jsonify(response)

# Propostas colocadas por um usuário
@app.route("/proposals/<id>", methods=['GET'])
def get_user_proposals(id):
    conn = db_connection()
    cur = conn.cursor()
    
    try:
        statement = """select oferta.id, ferramenta_id, ferramenta_type, brand, price, utilizador_id, date_start, location, photo
                    from oferta, ferramenta, emprestimo_ferramenta_toolbox as t, toolbox
                    where oferta.id = t.oferta_id and toolbox.id = t.toolbox_id and isProposal = 1 and ferramenta_id = ferramenta.id and utilizador_id = %s;"""
        
        cur.execute(statement, (id,))
        
        rows = cur.fetchall()
        
        results = []
        
        for row in rows:
            content = {
                "id": int(row[0]), 
                "ferramenta_id": int(row[1]), 
                "ferramenta_type": row[2],
                "ferramenta_brand": row[3],
                "ferramenta_price": float(row[4]),
                "utilizador_id": int(row[5]),
                "date_start": row[6],
                "location": row[7],
                "ferramenta_photo": base64.b64encode(row[8]).decode('utf-8')
                #"ferramenta_photo": row[8]    
                #"ferramenta_photo": row[8]    
            }
            
            results.append(content)
        
        response = {'status': StatusCodes['success'], 'results': results}
        
            
    except (Exception, sdb.DatabaseError) as error:
        response = {'status': StatusCodes['internal_error'], 'errors': str(error)}
        
    finally:
        if conn is not None:
            conn.close()
    
    return flask.jsonify(response)

@app.route("/requests/<id>", methods=['GET'])
def get_user_requests(id):
    conn = db_connection()
    cur = conn.cursor()
    
    try:
        statement = """select pedido.id, ferramenta_id, ferramenta_type, brand, price, utilizador_id, date_start, photo
                    from pedido, ferramenta
                    where isProposal = 1 and ferramenta_id = ferramenta.id and utilizador_id = %s;"""
        
        cur.execute(statement, (id,))
        
        rows = cur.fetchall()
        
        results = []
        
        for row in rows:
            content = {
                "id": int(row[0]), 
                "ferramenta_id": int(row[1]), 
                "ferramenta_type": row[2],
                "ferramenta_brand": row[3],
                "ferramenta_price": float(row[4]),
                "utilizador_id": row[5],
                "date_start": row[6],
                "ferramenta_photo": base64.b64encode(row[7]).decode('utf-8')
                #"ferramenta_photo": row[8]    
            }
            
            results.append(content)
        
        response = {'status': StatusCodes['success'], 'results': results}
        
            
    except (Exception, sdb.DatabaseError) as error:
        response = {'status': StatusCodes['internal_error'], 'errors': str(error)}
        
    finally:
        if conn is not None:
            conn.close()
    
    return flask.jsonify(response)

# Não sei se isto funciona ou se é necessário
'''
@app.route("/accepted_proposals/<id>")
def get_accepted_proposals(id):
    conn = db_connection()
    cur = conn.cursor()
    
    try:
        statement = """select id, ferramenta_id, ferramenta_type, ferramenta_brand, ferramenta_price, date_start, ferramenta_photo
                    from emprestimo_ferramenta
                    where isProposal = 1 and utilizador_id = %s;"""
        
        cur.execute(statement, (id,))
        
        rows = cur.fetchall()
        
        row = rows[0]
        
        results = {
                "id": int(row[0]), 
                "ferramenta_id": int(row[1]), 
                "ferramenta_type": row[2],
                "ferramenta_brand": row[3],
                "ferramenta_price": float(row[4]),
                "date_start": row[5],
                "ferramenta_photo": base64.b64encode(row[6]).decode('utf-8')   
            }
        
        response = {'status': StatusCodes['success'], 'results': results}
            
    except (Exception, sdb.DatabaseError) as error:
        response = {'status': StatusCodes['internal_error'], 'errors': str(error)}
        
    finally:
        if conn is not None:
            conn.close()
            
    return flask.jsonify(response)
'''

@app.route("/proposals/type/<search>", methods=['GET'])
def search_by_type(search):
    conn = db_connection()
    cur = conn.cursor()
    
    try:
        statement = f"""select oferta.id, ferramenta_id, ferramenta_type, brand, price, utilizador_id, date_start, location, photo
                        from oferta, ferramenta, emprestimo_ferramenta_toolbox as t, toolbox
                        where oferta.id = t.oferta_id and toolbox.id = t.toolbox_id and isProposal = 1 and ferramenta_id = ferramenta.id and ferramenta_type like '{search}%';"""
        
        cur.execute(statement, tuple())

        rows = cur.fetchall()
        results = []
        
        for row in rows:
            content = {
                "id": int(row[0]), 
                "ferramenta_id": int(row[1]), 
                "ferramenta_type": row[2],
                "ferramenta_brand": row[3],
                "ferramenta_price": float(row[4]),
                "utilizador_id": int(row[5]),
                "date_start": row[6],
                "location": row[7],
                "ferramenta_photo": base64.b64encode(row[8]).decode('utf-8')
                #"ferramenta_photo": row[8]    
            }
        
            results.append(content)
        
        response = {'status': StatusCodes['success'], 'results': results}
        
    except (Exception, sdb.DatabaseError) as error:
        response = {'status': StatusCodes['internal_error'], 'errors': str(error)}
        
    finally:
        if conn is not None:
            conn.close()
    
    return flask.jsonify(response)



@app.route("/proposals/location/<search>")
def search_by_location(search):
    conn = db_connection()
    cur = conn.cursor()
    
    try:
        statement = f"""select oferta.id, ferramenta_id, ferramenta_type, brand, price, utilizador_id, date_start, location, photo
                        from oferta, ferramenta, emprestimo_ferramenta_toolbox as t, toolbox
                        where oferta.id = t.oferta_id and toolbox.id = t.toolbox_id and isProposal = 1 and location like '{search}%';"""
        
        cur.execute(statement, tuple())

        rows = cur.fetchall()
        results = []
        
        for row in rows:
            content = {
                "id": int(row[0]), 
                "ferramenta_id": int(row[1]), 
                "ferramenta_type": row[2],
                "ferramenta_brand": row[3],
                "ferramenta_price": float(row[4]),
                "utilizador_id": int(row[5]),
                "date_start": row[6],
                "location": row[7],
                "ferramenta_photo": base64.b64encode(row[8]).decode('utf-8')
                #"ferramenta_photo": row[8]    
            }
        
            results.append(content)
        
        response = {'status': StatusCodes['success'], 'results': results}
        
    except (Exception, sdb.DatabaseError) as error:
        response = {'status': StatusCodes['internal_error'], 'errors': str(error)}
        
    finally:
        if conn is not None:
            conn.close()
    
    return flask.jsonify(response)


@app.route("/requests/type/<search>", methods=['GET'])
def search_by_type_req(search):
    conn = db_connection()
    cur = conn.cursor()
    
    try:
        statement = f"""select pedido.id, ferramenta_id, ferramenta_type, brand, price, utilizador_id, date_start, photo
                    from pedido, ferramenta
                    where isProposal = 1 and ferramenta_id = ferramenta.id and ferramenta_type like '{search}%';"""
        
        cur.execute(statement, tuple())

        rows = cur.fetchall()
        results = []
        
        for row in rows:
            content = {
                "id": int(row[0]), 
                "ferramenta_id": int(row[1]), 
                "ferramenta_type": row[2],
                "ferramenta_brand": row[3],
                "ferramenta_price": float(row[4]),
                "utilizador_id": int(row[5]),
                "date_start": row[6],
                "ferramenta_photo": base64.b64encode(row[7]).decode('utf-8')
                #"ferramenta_photo": row[8]    
            }
        
            results.append(content)
        
        response = {'status': StatusCodes['success'], 'results': results}
        
    except (Exception, sdb.DatabaseError) as error:
        response = {'status': StatusCodes['internal_error'], 'errors': str(error)}
        
    finally:
        if conn is not None:
            conn.close()
    
    return flask.jsonify(response)



@app.route("/proposals/accept/<id>", methods=['PUT'])
def accept_proposal(id):
    conn = db_connection()
    cur = conn.cursor()
    
    try:
        statement = """update oferta
                    set isProposal = 0
                    where id = %s;"""
                    
        cur.execute(statement, (id, ))
        response = {'status': StatusCodes['success'], 'results': f'Updated: {cur.rowcount}'}
        
        conn.commit()
    except (Exception, sdb.DatabaseError, ValueError) as error:
        response = {'status': StatusCodes['internal_error'], 'errors': str(error)}
        
        conn.rollback()
        
    finally:
        if conn is not None:
            conn.close()
    
    return flask.jsonify(response)



# Teste para ver se a imagem ia para a base de dados
@app.route("/show_image/<proposal_id>")
def show_image(proposal_id):
    conn = db_connection()
    cur = conn.cursor()
    
    try:
        # Fetch image data from the database
        cur.execute("SELECT ferramenta_photo FROM emprestimo_ferramenta WHERE id = %s", (proposal_id,))
        row = cur.fetchone()
        if row:
            image_data = row[0]
            
            with open("wise_tree_cp.jpg", "wb") as f:
                f.write(image_data)

            # Load image from bytes
            image = Image.open(io.BytesIO(image_data))
            
            # Check if the image is valid
            if image.format is None:
                raise ValueError("Image data is not valid")
            
            # Display the image
            image.show()  # Display the image using the default image viewer
            
            response = {'status': StatusCodes['success'], 'results': 'Image displayed'}
        else:
            response = {'status': StatusCodes['api_error'], 'results': 'Proposal not found'}

    except (Exception, sdb.DatabaseError, ValueError) as error:
        response = {'status': StatusCodes['internal_error'], 'errors': str(error)}
        
    finally:
        if conn is not None:
            conn.close()
    
    return flask.jsonify(response)





if __name__ == '__main__':
    host = '127.0.0.1'
    port = 8080
    app.run(host=host, debug=True, threaded=True, port=port)
    
