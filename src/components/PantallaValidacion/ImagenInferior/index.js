import React from 'react';

import LineasGrises from '../../../assets/img/lineasGrises.png';

import styles from './index.module.scss';

function ImagenInferior() {
  return (
    <div>
      <img className={styles.LineasGrises} src={LineasGrises} />
    </div>
);
}
export default ImagenInferior;