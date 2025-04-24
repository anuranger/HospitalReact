import React, { useRef, useEffect, useState } from 'react';
import Options from './Options'; 
import { useDispatch } from 'react-redux'; 
import { updateNode, showClinicians } from '../redux/treeSlice';
import TreeNode from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical,  } from '@fortawesome/free-solid-svg-icons';
import { faPlusSquare, faMinusSquare, faHospital, faUserCircle  } from '@fortawesome/free-regular-svg-icons'
import "./../styles/treenode.scss";
import { validateInput } from '../utils';

interface TreeNodeProps {
  node: TreeNode
}

const TreeNodeFunction: React.FC<TreeNodeProps> = ({node}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [floater, setFloater] = useState(false);
  const [boxStyle, setBoxStyle] = useState<React.CSSProperties>({});
  const [inputName, setInputName] = useState('');
  const parentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const toggle = (keepOpen : Boolean) => setIsOpen((prev) => Boolean(keepOpen ? keepOpen : !prev ));
  const toggleEdit = () => setIsEdit((prev) => !prev);

  const displayFloater = (event: React.MouseEvent<HTMLSpanElement>) => {
    setFloater(!floater);
    const target = event.target as Element;
    const element = target?.closest(".listElement");
    setBoxStyle({
      left: `${event.currentTarget.getBoundingClientRect().left - element!.getBoundingClientRect().left + 35}px`,
    });
  };

  const closeFloater = () => setFloater(false);

  const closeBox = (event: MouseEvent) => {
    if (parentRef.current && !parentRef.current.contains(event.target as Node)) {
      setFloater(false);
    }
  };

  const updateNodeAction = () => {
    if(!error) {
      dispatch(updateNode({ index: node.index, name: inputName, isEdit }));
      if (isEdit) toggleEdit();
    }
  };

  useEffect(() => {
    setInputName(node.name);
    document.addEventListener('click', closeBox);
    return () => document.removeEventListener('click', closeBox);
    
  }, []);

  useEffect(() => {
      if(isEdit) {
        inputRef.current?.focus();
      }
    }, [isEdit]);

    useEffect(() => {
      const handleReload = ()=> {
        dispatch(showClinicians(""));
      }
        window.addEventListener("load", handleReload);
       return () => window.removeEventListener("load", handleReload);
    }, [dispatch]);

    

  return (
    <div ref={parentRef} className={`myTree`}>

      <div className="box">
        <span className="icon" hidden={node?.children.length !== 0}></span>
        <span className="icon" onClick={() => toggle(false)} hidden={node?.children.length === 0}>
          {isOpen ? <FontAwesomeIcon icon={faMinusSquare} size={"sm"}/> : <FontAwesomeIcon icon={faPlusSquare} size={"sm"}/>}
        </span>
        <span>
       { node?.index?.toString().split('_').length === 2 ?  <FontAwesomeIcon icon={faHospital} /> : node?.index !== '0' ?  <FontAwesomeIcon icon={faUserCircle} size={"sm"}/> : "" }
        </span>
        <i
          style={{ textAlign: 'center', margin: '3px' }}
          hidden={node?.index === '0'}
          className={
            node?.index?.toString().split('_').length === 2
              ? 'fa-solid fa-hospital'
              : node?.index !== '0'
              ? 'fa-solid fa-user'
              : ''
          }
        ></i>
        <span
          className="nodeName"
          style={{fontWeight: floater? "bold":"normal"}}
          hidden={node?.name === '' || isEdit}
        >
          {node?.name}
        </span>
        {<div className='inputDiv' hidden={node?.name !== '' && !isEdit}>   
            <div className='inputButton'>
            <input
              ref={inputRef}
              type="text" 
              placeholder="Enter Catergory Name"
              className='input'
              value={inputName}
              onChange={(e) => {setInputName(e.target.value); setError(validateInput(e.target.value));}}
              autoFocus={true}
              hidden={node?.name !== '' && !isEdit}
            />
            <button
                className='buttonAdd'
                onClick={updateNodeAction}
                hidden={node?.name !== '' && !isEdit}
              >
                {isEdit ? "Edit" : "Add"}
              </button>
              </div>
          {error && <small className='error'>{error}</small>}
         </div>
        }
       
        <span  onClick={displayFloater} hidden={node?.index == '0'} className='verticalEllipsis'><FontAwesomeIcon icon = {faEllipsisVertical} className="fa-solid fa-ellipsis-vertical" /></span>
        {floater && (
          <div className='floaterClass' style={{left: boxStyle.left}}>
            <Options
              index={node?.index}
              closeBox={closeFloater}
              toggle={toggle}
              toggleEdit={toggleEdit}
            />
          </div>
        )}
      </div>

      {isOpen && (
        <ul className="treenode open">
          {node?.children.map((child:TreeNode, index) => (
            <li key={index} className='listElement'>
              <TreeNodeFunction node={child} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TreeNodeFunction;
