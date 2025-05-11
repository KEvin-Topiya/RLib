import React, { useState, useEffect } from 'react';
import CONFIG from '../../config';
import axios from "axios";

export default function GridEditor() {
  const [title, setTitle] = useState('My Grid Plan');
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);
  const [grid, setGrid] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [objectData, setObjectData] = useState({ label: '', color: '#ffcc00', type: 'bookshelf' });
  const [dragging, setDragging] = useState(false);

  const types = ['bookshelf', 'table', 'desk', 'door'];

  useEffect(() => {
    setGrid((prevGrid) => {
      const newGrid = [];
      for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
          row.push((prevGrid[r] && prevGrid[r][c]) || null);
        }
        newGrid.push(row);
      }
      return newGrid;
    });
  }, [rows, cols]);
  const handleSaveToDB = async () => {
    const data = { title, rows, cols, grid };
    console.log(data)
    try {
        const response = await axios.post(CONFIG.DOMAIN+CONFIG.API.SAVE_GRID, data);
        alert(response.data.message);
    } catch (error) {
        alert('Error saving grid to database');
        console.error(error);
    }
};


  const handleCellMouseDown = (row, col) => {
    setSelectedCells([{ row, col }]);
    const selectedCell = grid[row][col];
    if (selectedCell) {
      setObjectData({
        label: selectedCell.label || '',
        color: selectedCell.color || '#ffcc00',
        type: selectedCell.type || 'bookshelf',
      });
    }
    setDragging(true);
  };

  const handleCellMouseEnter = (row, col) => {
    if (!dragging) return;
    const exists = selectedCells.some((cell) => cell.row === row && cell.col === col);
    if (!exists) setSelectedCells((prev) => [...prev, { row, col }]);
  };

  const handleMouseUp = () => setDragging(false);

  const handlePlaceObject = () => {
    const newGrid = [...grid];
    const groupId = `${Date.now()}`;
    selectedCells.forEach(({ row, col }) => {
      newGrid[row][col] = {
        label: objectData.label,
        color: objectData.type === 'door' ? '#8B4513' : objectData.color,
        type: objectData.type,
        groupId,
      };
    });
    setGrid(newGrid);
    setSelectedCells([]);
  };

  const handleRemoveSelected = () => {
    const newGrid = [...grid];
    selectedCells.forEach(({ row, col }) => {
      newGrid[row][col] = null;
    });
    setGrid(newGrid);
    setSelectedCells([]);
  };

  const handleSave = () => {
    const data = { title, rows, cols, grid };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/\s+/g, '_').toLowerCase() || 'library-grid'}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleTrimGrid = () => {
    let top = 0, bottom = grid.length - 1;
    let left = 0, right = grid[0]?.length - 1;

    while (top <= bottom && grid[top].every(cell => cell === null)) top++;
    while (bottom >= top && grid[bottom].every(cell => cell === null)) bottom--;
    while (left <= right && grid.every(row => row[left] === null)) left++;
    while (right >= left && grid.every(row => row[right] === null)) right--;

    const trimmedGrid = [];
    for (let r = top; r <= bottom; r++) {
      trimmedGrid.push(grid[r].slice(left, right + 1));
    }

    setGrid(trimmedGrid);
    setRows(trimmedGrid.length);
    setCols(trimmedGrid[0]?.length || 0);
    setSelectedCells([]);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (Array.isArray(data.grid)) {
          setTitle(data.title || 'Untitled Grid');
          setRows(data.rows || data.grid.length);
          setCols(data.cols || data.grid[0]?.length || 0);
          setGrid(data.grid);
          setSelectedCells([]);
        } else {
          alert('Invalid grid format.');
        }
      } catch (err) {
        alert('Failed to parse JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ padding: '20px' }} onMouseUp={handleMouseUp}>
      <div style={{ marginBottom: '10px' }}>
        <label>
          Plan Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter plan title"
            style={{ marginLeft: '10px', padding: '6px', width: '250px' }}
          />
        </label>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <label>
          Rows:
          <input
            type="number"
            value={rows}
            onChange={(e) => setRows(parseInt(e.target.value))}
            min="1"
            style={{ marginLeft: '8px', padding: '4px' }}
          />
        </label>
        <label>
          Columns:
          <input
            type="number"
            value={cols}
            onChange={(e) => setCols(parseInt(e.target.value))}
            min="1"
            style={{ marginLeft: '8px', padding: '4px' }}
          />
        </label>
        <button onClick={handleSave} style={{ padding: '6px 12px' }}>Save Grid</button>
        <button onClick={handleTrimGrid} style={{ padding: '6px 12px' }}>Trim Grid</button>
        <button onClick={handleSaveToDB} style={{ padding: '6px 12px', marginLeft: '10px' }}>Save to Database</button>

        <label style={{ display: 'inline-block', padding: '6px 12px', backgroundColor: '#ddd', cursor: 'pointer' }}>
          Upload Grid
          <input type="file" accept=".json" onChange={handleUpload} style={{ display: 'none' }} />
        </label>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>
          Type:
          <select
            value={objectData.type}
            onChange={(e) => {
              const type = e.target.value;
              const defaultColor = type === 'door' ? '#8B4513' : objectData.color;
              setObjectData({ ...objectData, type, color: defaultColor });
            }}
            style={{ marginLeft: '10px', padding: '6px' }}
          >
            {types.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 40px)`,
          gap: '4px',
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isSelected = selectedCells.some(
              (sel) => sel.row === rowIndex && sel.col === colIndex
            );
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
                style={{
                  width: '40px',
                  height: '40px',
                  border: '1px solid #ccc',
                  background: isSelected
                    ? '#00ffff'
                    : cell?.color || '#f9f9f9',
                  fontSize: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
                title={cell?.label || ''}
              >
                {cell?.label}
              </div>
            );
          })
        )}
      </div>

      {selectedCells.length > 0 && (
        <div style={{
          marginTop: '20px',
          padding: '10px',
          border: '1px solid #ccc',
          maxWidth: '300px',
          backgroundColor: '#fff',
          borderRadius: '6px',
        }}>
          <h4>Assign Label to Selection</h4>
          <input
            type="text"
            placeholder="Label"
            value={objectData.label}
            onChange={(e) => setObjectData({ ...objectData, label: e.target.value })}
            style={{ width: '100%', marginBottom: '10px', padding: '6px' }}
          />
          <input
            type="color"
            value={objectData.color}
            onChange={(e) => setObjectData({ ...objectData, color: e.target.value })}
            style={{ width: '100%', marginBottom: '10px', padding: '6px' }}
            disabled={objectData.type === 'door'}
          />
          <button onClick={handlePlaceObject} style={{ padding: '6px 12px', marginRight: '8px' }}>
            Apply
          </button>
          <button onClick={handleRemoveSelected} style={{ padding: '6px 12px', backgroundColor: '#ff4444', color: '#fff' }}>
            Remove
          </button>
          
        </div>
      )}
    </div>
  );
}
