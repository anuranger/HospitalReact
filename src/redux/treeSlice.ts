import { createSlice } from '@reduxjs/toolkit';
import TreeData from './../types';
import TreeNode from './../types';

const initialState: { treeData: TreeData, openClinician: string } = {
  treeData: {
    name: ' ',
    index: "0",
    children: [
      {
        name: 'Hospital A',
        index: 'child_1',
        clinicians: {
          people: ['Person A', 'Anita Berge', 'Person C'],
          isOpen: false,
        },
        children: [
          { name: 'Department 1', children: [], index: 'child_1_1' },
          {
            name: 'Department 2',
            index: 'child_1_2',
            children: [{ name: 'Disease 1', index: 'child_1_2_1', children: [] }],
          },
        ],
      },
      {
        name: 'Hospital B',
        index: 'child_2',
        children: [{ name: 'Department 1', index: 'child_2_1', children: [] }],
      },
      {
        name: 'Hospital C',
        index: 'child_3',
        children: [{ name: 'Department 1', index: 'child_3_1', children: [] }],
      },
    ],
  },
  openClinician: '',
};

const findNode = (nodes: TreeNode[], index: string) => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].index === index) {
        return nodes[i];
      }
      if (nodes[i].children && nodes[i].children.length > 0) {
        let found:{} = findNode(nodes[i].children, index);
        if (found) return found;
      }
    }
    return false;
}

const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {

    addNode: (state, action) => {
      const findNewIndex = (children: TreeNode[]) => {
        const existingIndices = children.map(child => parseInt(child?.index.split('_').pop()!));
        return existingIndices.length === 0 ? 1 : Math.max(...existingIndices) + 1;
      }

      const findAndAddNode = (nodes: TreeNode[]) : Boolean => {
        for (let i = 0; i < nodes.length; i++) {
          
          if (nodes[i].index === action.payload) {
            //const newIndex = ;
            const newIndex = findNewIndex(nodes[i].children);
            nodes[i].children.push({
              name: '',
              index: `${action.payload}_${newIndex}`,
              children: [],
            });
            //action.payload.setNewIndex(newIndex);
            return true;
          }
          if (nodes[i].children && nodes[i].children.length > 0) {
            let found = findAndAddNode(nodes[i].children);
            if (found) return found;
          }
        }
        return false;
      };

      findAndAddNode(state.treeData.children);
    },
    updateNode: (state, action) => {
      const findAndUpdateNode = (nodes: TreeNode[]) => {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].index === action.payload.index) {
            if(action.payload.isEdit) {
              nodes[i].name = action.payload.name;
            } 
            else {
              nodes[i].name = action.payload.name;
              // nodes[i === 0 ? i : i+1] = {
              //   name: action.payload.name,
              //   index: action.payload.newAddedIndex,
              //   children: [],
              // };
            }
            return true;
          }
          if (nodes[i].children && nodes[i].children.length > 0) {
            let found = findAndUpdateNode(nodes[i].children);
            if (found) return true;
          }
        }
        return false;
      };

      findAndUpdateNode(state.treeData.children);
    },
    removeNode: (state, action) => {
      const findAndRemoveNode = (nodes: TreeNode[]) => {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].index === action.payload) {
            nodes.splice(i, 1);
            //console.log("found")
            //console.log(nodes)
            return true;
          }
          if (nodes[i].children && nodes[i].children.length > 0) {
            let found = findAndRemoveNode(nodes[i].children);
            if (found) return true;
          }
        }
        return false;
      };

      findAndRemoveNode(state.treeData.children);
    },
    addClinician: (state, action) => {

      const findAndAddClinician = (nodes: TreeNode[] ) => {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].index === action.payload.index) {
            if (nodes[i]!.clinicians && nodes[i]!.clinicians!.people?.length > 0) {
              nodes[i]?.clinicians?.people.push(action.payload.name);
            } else {
              nodes[i].clinicians = {
                people: [action.payload.name],
                isOpen: false,
              };
            }
            return true;
          }
          if (nodes[i].children && nodes[i].children.length > 0) {
            let found = findAndAddClinician(nodes[i].children);
            if (found) return true;
          }
        }
        return false;
      };

      findAndAddClinician(state.treeData.children);
    },
    removeClinician: (state, action) => {

      const findAndRemoveClinician = (nodes: TreeNode[]) => {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].index === action.payload.index) {
            nodes[i]?.clinicians?.people.splice(action.payload.removeIndex, 1);
            return true;
          }
          if (nodes[i].children && nodes[i].children.length > 0) {
            let found = findAndRemoveClinician(nodes[i].children);
            if (found) return true;
          }
        }
        return false;
      };

      findAndRemoveClinician(state.treeData.children);
    },
    showClinicians: (state, action) => {
      state.openClinician = action.payload;
    },
  },
});

export const {
  addNode,
  updateNode,
  removeNode,
  addClinician,
  removeClinician,
  showClinicians,
} = treeSlice.actions;

export default treeSlice.reducer;
