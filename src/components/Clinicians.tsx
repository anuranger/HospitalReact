import React, { useState, useMemo, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import "./../styles/clinicins.scss";
import { addClinician, removeClinician, showClinicians } from "../redux/treeSlice";
import TreeData from './../types';
import { useDispatch } from "react-redux";
import { validateInput } from "../utils";

interface Props {
  treeData: TreeData;
  openClinician: string;
}

const Clinicians: React.FC<Props> = ({
  treeData,
  openClinician
}) => {
  const [inputName, setInputName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [clinicians, setClinicians] = useState<string[]>([]);
  const [showAddSection, setShowAddSection] = useState(false);
  const [error, setError] = useState("");
    const dispatch = useDispatch();

    useEffect(()=> {
        findClinicians();
    }, []);

    useEffect(()=> {
        findClinicians();
        setInputName("");
        setShowAddSection(false);
    }, [treeData]);

  const findClinicians = () => {
    const find = (nodes: any[]) => {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].index === openClinician) {
          setClinicians([...nodes[i]?.clinicians?.people || []]);
          return true;
        }
        if (nodes[i].children && nodes[i].children.length > 0) {
          const found = find(nodes[i].children);
          if (found) return true;
        }
      }
      return false;
    };
    find(treeData.children || []);
  };

  const filteredClinicians = useMemo(
    () =>
      clinicians.filter((clinician) =>
        clinician.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [clinicians, searchQuery]
  );

  const handleAddClinician = () => {
    if(!error && inputName) {
        dispatch(addClinician({ index: openClinician, name: inputName }));
    }
    if(!inputName) {
        setError("Field cannot be empty");
    }
   
  };

  const handleDeleteClinician = (index: number) => {
    dispatch(removeClinician({ index: openClinician, removeIndex: index }));
  };

  return (
    <div className="box-clinic">
      <h3>Clinicians in group</h3>
      <div className="search">
        <p>{clinicians.length} of {clinicians.length} records displayed</p>
        <div className="inputLabel">
            <p>Find</p>
            <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Remove from Group</th>
          </tr>
        </thead>
        <tbody>
          {filteredClinicians.map((clinician, index) => (
            <tr key={index}>
              <td>{clinician}</td>
              <td>
                <button onClick={() => handleDeleteClinician(index)} className="deleteIcon">
                  <FontAwesomeIcon icon={faTrashAlt} size="sm" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

  
      {!showAddSection && (
        <button
         className="linkStyle"
          onClick={() => setShowAddSection(true)}
        >
          Add Clinician
        </button>
      )}
      {!showAddSection && (
        <button
         className="linkStyle"
          onClick={() => dispatch(showClinicians(""))}
        >
          Close
        </button>
      )}
      {showAddSection && (
        <div className="inputDiv">
            <div className='inputButton'>
          <input
            type="text"
            value={inputName}
            onChange={(e) => {setInputName(e.target.value); setError(validateInput(e.target.value))}}
            placeholder="Name"
            autoFocus={true}
          />
          <button onClick={handleAddClinician} className="buttonAdd">
            Add
          </button>
          </div>
          {error && <small className='error'>{error}</small>}
          
        </div>
      )}
    </div>
  );
};

export default Clinicians;
