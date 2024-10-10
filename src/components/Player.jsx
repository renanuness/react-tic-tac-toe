import { useState } from "react";



export default function Player({ symbol, name, isActive, onNameChange}) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(name);

    
    function handleEditClick() {
        setIsEditing((editing)=>!editing)

        if(isEditing){
            onNameChange(symbol, value);
        }
    }

    function hadleInput(e){
        setValue(e.target.value);
    }

    let playerName = <span className="player-name">{value}</span>;

    if(isEditing){
        playerName = <input type="text" required onChange={hadleInput} value={value} />;
    }

    return (
        <li className={isActive ? 'active' : ''}>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={() => handleEditClick()}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}