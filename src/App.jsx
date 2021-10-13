import { useState } from 'react'
import { MeIndex, useMeIndex, useMeIndexs } from './useMeIndexs';

function App() {
  return (
    <div>
      <Menu />
    </div>
  )
}

const Menu = () => {
  const context = useMeIndexs();
  return (
    <MeIndex value={context}>
      <Item /> {/* I'm index 0 */}
      <Item /> {/* I'm index 1 */}
      <div>
        <div>
          <Item /> {/* I'm arbitrarily nested, but still know that I'm index 2 */}
        </div>
      </div>
    </MeIndex>
  );
};

const Item = () => {
  const index = useMeIndex();
  return <div>My index is {index}</div>;
};

export default App
