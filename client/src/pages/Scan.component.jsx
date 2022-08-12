import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Scan = () => {
    const { id } = useParams()
    useEffect(() => {
        axios.patch(`http://localhost:5000/api/v1/codes/redeem/${id}`, {redeemed: true}, {withCredentials: true})
        
    }, [])
    return ( <></> );
}
 
export default Scan;