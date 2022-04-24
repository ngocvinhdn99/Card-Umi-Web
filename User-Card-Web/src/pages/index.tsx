import styles from './index.less';
import imageList from '@/configs/image';

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      {/* <2CImage /> */}
      <img src={imageList.imageAS} />
      <img src={imageList.card10S} />
      <img src={imageList.cardTS} />
    </div>
  );
}
