import './Cards.css';
import ImagemLupa from "../../Assets/lupa-04.svg"

const Offer_Card = ({username,location}) => (
    <a href="#"   className="unit Card">
        <div className="unit_left">
        <div className="pfp"></div>
        <p className="username">{username}</p>
        </div>
        <div className="unit_right">
        <b>{location}</b>
        <img src={ImagemLupa} alt="tool_image" />
        </div>
    </a>
);

export default Offer_Card;