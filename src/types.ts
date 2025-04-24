
export default interface TreeNode {
    name: string;
    index: string;
    children: TreeNode[];
    clinicians?: {
      people: string[];
      isOpen: boolean;
    };
  }
  
  export default interface TreeData {
    name: string;
    index: string;
    children: TreeNode[];
  }

  export default interface RootState {
    tree?: {
      treeData: TreeNode;
      openClinician: string;
    }
  }