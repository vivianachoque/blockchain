import React from 'react';

import boardCells from '../constants/boardCells';
import blocks from '../constants/blocks';
import Block from '../Blocks/components/Block';

import styles from './index.module.scss';

class BoardGame extends React.Component {
  state = {
    dataBlock: ''
  };

  handleDragStart = e => {
    const { id } = e.target;
    const [lastColumn] = Object.keys(this.state).filter(value => this.state[value] === id);
    const dataBlock = { ...this.state.dataBlock };
    e.dataTransfer.setData('text/plain', id);
    /* Borra los datos del state de la celda donde estaba posicionado el block antes de moverlo*/
    dataBlock[lastColumn] = '';
    setTimeout(() => {
      this.setState({ [lastColumn]: '', dataBlock });
    }, 0);
    console.log('strat bg')
  };

  handleDragEnd = e => {
    const elemento = e.target;
    // const dragSuccess = e.dataTransfer.dropEffect;
    /*     elemento.classList.remove(styles.blockActive);
     */
    /* if (dragSuccess === 'move') {
      setTimeout(() => {
        // elemento.classList.add(styles.blockActive);
        // elemento.draggable = false;
      }, 0);
    } */
  };

  handleDragOver = e => {
    const element = e.target;
    e.preventDefault();
  };

  handleDragEnter = e => {
    e.preventDefault();
    e.target.classList.add(styles.cellDragHover);
  };

  handleDragLeave = e => {
    e.preventDefault();
    e.target.classList.remove(styles.cellDragHover);
  };

  getBlock = (idBlock, idColumn) => {
    const dataBlock = { ...this.state.dataBlock };
    [dataBlock[idColumn]] = blocks.filter(block => block.id === parseInt(idBlock));
    const [row, column] = idColumn.split('_');
    this.setState({
      ...this.prevState,
      [idColumn]: idBlock,
      dataBlock
    });
    console.log(idBlock)
  };

  handleDrop = e => {
    e.preventDefault();
    const element = e.target;
    const isColumn = element.classList.contains('columnDrag');
    const idColumn = isColumn ? element.id : element.parentNode.parentNode.id;
    const idBlock = e.dataTransfer.getData('text');
    
    this.getBlock(idBlock, idColumn);
    element.classList.remove(styles.cellDragHover);
  };

  render() {
    return (
      <div className={styles.board}>
        {boardCells.map(cell => (
          /* row */
          <div className={styles.rowCell} key={cell.idRow} id={cell.idRow}>
            {cell.idColumns.map(idColumn => (
              /* columns  */
              <div
                className={`${styles.columnCell} columnDrag`}
                key={idColumn}
                id={idColumn}
                onDragOver={e => this.handleDragOver(e)}
                onDragEnter={e => this.handleDragEnter(e)}
                onDragLeave={e => this.handleDragLeave(e)}
                onDrop={e => this.handleDrop(e)}
              >
                {this.state.dataBlock[idColumn]  && (
                  <Block
                    {...this.state.dataBlock[idColumn]}
                    onDragStart={e => this.handleDragStart(e)}
                    onDragEnd={e => this.handleDragEnd(e)}
                    bigBlock
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default BoardGame;

/*
  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDragEnter = e => {
    e.preventDefault();
    e.target.classList.add(styles.cellDragHover);
  };

  const handleDragLeave = e => {
    e.preventDefault();
    e.target.classList.remove(styles.cellDragHover);
  };

  const handleDragDrop = e => {
    e.target.appendChild(blockDrag);
    e.target.classList.remove(styles.cellDragHover);
  }; */

/*
    drop aca
    const id = e.dataTransfer.getData('text');
    const element = document.getElementById(id) || false ;
    const dataElement = element ? element.attributes['data-drag'] : false;
    const elementClone = element.cloneNode(true)
    if (dataElement) {
     console.log( e.target.id.split("_"))
      e.target.classList.remove(styles.cellDragHover);
      console.log(element);
      e.target.appendChild(elementClone)
    } */
