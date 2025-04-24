import { useSelector } from "react-redux";
import RootState from "../types";
import TreeNodeFunction from './TreeNodeFunction'
import Clinicians from "./Clinicians";
import './../styles/tree.scss';

export default function Tree() {
    const treeData = useSelector((state: RootState) => state?.tree?.treeData);
    const openClinician = useSelector((state: RootState) => state?.tree?.openClinician);
  return (
    <div className="treeContainer">
      {treeData &&  <TreeNodeFunction node={treeData} />}
      {
        openClinician && openClinician !== '' && treeData && <Clinicians treeData={treeData} openClinician={openClinician} />
      }
    </div>
  );
}   