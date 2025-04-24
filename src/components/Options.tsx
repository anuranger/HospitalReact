import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import "./../styles/options.scss";
import { useDispatch } from "react-redux";
import { addNode, removeNode, showClinicians } from "./../redux/treeSlice";
import { faPlus,faPencil } from '@fortawesome/free-solid-svg-icons'

interface Props {
  index: string;
  toggle: Function;
  toggleEdit: Function;
  closeBox: Function
}

const Options: React.FC<Props> = ({
  index,
  toggle,
  toggleEdit,
  closeBox,
}) => {
    const dispatch = useDispatch();
    const editgroup = () => {
        toggleEdit();
        closeBox();
    }

    const addgroup = () => {
        dispatch(addNode(index));
        toggle(true);
        closeBox();
    }
    const changeClinicians = () => {
        dispatch(showClinicians(index));
        toggle();
        closeBox();
    }
  return (
      <ul className="dropdown-ul">
        <li className="dropdown-item" onClick={editgroup}>
            {/* <div className="inlineOptions"> */}
                <FontAwesomeIcon icon={faPencil}  /> Edit Group
                {/* <span>Edit Group</span>
            </div> */}
        </li>
        <li
          className="dropdown-item"
          onClick={addgroup}
        >
          <FontAwesomeIcon icon={faPlus} size={"sm"}/> Create Child Group
        </li>
        <li
          className="dropdown-item"
          onClick={changeClinicians}
        >
          <FontAwesomeIcon icon={faPlus} size={"sm"}/> Add / Remove Clinicians
        </li>
        <li className="dropdown-item" onClick={()=> dispatch(removeNode(index))}>
            <FontAwesomeIcon icon={faTrashAlt}/> Remove Group
        </li>
      </ul>
  );
};

export default Options;
