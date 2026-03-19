import { useState } from 'react'
import explorer from './data/folderData'
import Folder from './components/folder.jsx';

import './index.css'
import useTraverseTree from './hooks/use-traverse-tree.jsx';

export default function App() {

  const [explorerData, setExplorerData] = useState(explorer)
  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);

    setExplorerData(finalTree);

  }


  return (
    <>
      <div className='App'>
        <Folder handleInsertNode={handleInsertNode} explorer={explorerData} />

      </div>

    </>
  )
}


