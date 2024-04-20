import singlestoredb as sdb
import flask
import base64
from PIL import Image
import io
from flask_cors import CORS



app = flask.Flask(__name__)
CORS(app, resources={r"/proposals": {"origins": "http://localhost:3000"}})

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
    
@app.route("/new_proposal", methods=['POST'])
def create_proposal():
    #payload = flask.request.get_json()
    image = "wise_tree.jpg"
    with open(image, "rb") as img_file:
       imageData = img_file.read()

    
    conn = db_connection()
    cur = conn.cursor()

    # do not forget to validate every argument, e.g.,:
    #if 'id' not in payload:
    #    response = {'status': StatusCodes['api_error'], 'results': 'id value not in payload'}
    #    return flask.jsonify(response)

    # parameterized queries, good for security and performance
    statement = 'INSERT INTO emprestimo_ferramenta VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'
    values = (1, '2024-04-20', True, 1, "Martelo do José", "Martelo", imageData, "balls", 1.00, 1)
    #values = (2, '2024-04-20', False, 2, "Martelo do Chico", "Martelo", image, "balls", 1.50, 2)
    #values = (id, date_start, 1, ferramenta_id, ferramenta_name, ferramenta_type, imageData, ferramenta_brand, price, utilizador_id)

    try:
        cur.execute(statement, values)

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

@app.route("/proposals")
def get_all_proposals():
    conn = db_connection()
    cur = conn.cursor()
    
    try:
        cur.execute("""select id, ferramenta_id, ferramenta_name, ferramenta_type, ferramenta_brand, ferramenta_price, utilizador_id, date_start, ferramenta_photo
                    from emprestimo_ferramenta
                    where isProposal = 1;""")
        
        rows = cur.fetchall()
        
        results = []
        
        
        for row in rows:
            print(row)
            content = {
                "id": int(row[0]), 
                "ferramenta_id": int(row[1]), 
                "ferramenta_name": row[2],
                "ferramenta_type": row[3],
                "ferramenta_brand": row[4],
                "ferramenta_price": float(row[5]),
                "utilizador_id": int(row[6]),
                "date_start": row[7],
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

@app.route("/proposals/<id>", methods=['GET'])
def get_user_proposals(id):
    conn = db_connection()
    cur = conn.cursor()
    
    try:
        statement = """select id, ferramenta_id, ferramenta_name, ferramenta_type, ferramenta_photo, ferramenta_brand, ferramenta_price, date_start
                    from emprestimo_ferramenta
                    where isProposal = 1 and utilizador_id = %s;"""
        
        cur.execute(statement, (id,))
        
        rows = cur.fetchall()
        
        results = []
        
        for row in rows:
            content = {
                "id": int(row[0]), 
                "ferramenta_id": int(row[1]), 
                "ferramenta_name": row[2],
                "ferramenta_type": row[3],
                "ferramenta_photo": row[4],
                "ferramenta_brand": row[5],
                "ferramenta_price": float(row[6]),
                "date_start": row[8]    
            }
            
            results.append(content)
        
        response = {'status': StatusCodes['success'], 'results': results}
        
            
    except (Exception, sdb.DatabaseError) as error:
        response = {'status': StatusCodes['internal_error'], 'errors': str(error)}
        
    finally:
        if conn is not None:
            conn.close()
    
    return flask.jsonify(response);
 
@app.route("/accepted_proposals/")
def get_accepted_proposals(id):
    conn = db_connection()
    cur = conn.cursor()
    
    try:
        statement = """select id, ferramenta_id, ferramenta_name, ferramenta_type, ferramenta_photo, ferramenta_brand, ferramenta_price, date_start
                    from emprestimo_ferramenta
                    where isProposal = 1 and utilizador_id = %s;"""
        
        cur.execute(statement, (id,))
        
        rows = cur.fetchall()
        
        row = rows[0]
        
        results = {
                "id": int(row[0]), 
                "ferramenta_id": int(row[1]), 
                "ferramenta_name": row[2],
                "ferramenta_type": row[3],
                "ferramenta_photo": row[4],
                "ferramenta_brand": row[5],
                "ferramenta_price": float(row[6]),
                "date_start": row[7]    
            }
        
        response = {'status': StatusCodes['success'], 'results': results}
            
    except (Exception, sdb.DatabaseError) as error:
        response = {'status': StatusCodes['internal_error'], 'errors': str(error)}
        
    finally:
        if conn is not None:
            conn.close()
            
    return flask.jsonify(response)

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
    
