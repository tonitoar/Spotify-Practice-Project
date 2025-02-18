import { useState } from "react";
import Track from "./Track"; 

export default function TrackList() {

    const [results] = useState([{name:"", artist:"", album:"", id:null }]); 

    return(
        <>
           <div>
                {results.map(item => (
                    <Track key={item.id} result={item} />
                ))}
           </div>
        </>
    ); 
}