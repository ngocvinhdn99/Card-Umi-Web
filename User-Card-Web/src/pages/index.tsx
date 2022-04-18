import styles from './index.less';
import imageList from './cardImgList';

export default function IndexPage() {
  console.log(imageList.image2C);
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      {/* <2CImage /> */}
      <img src={imageList.imageAH} />
    </div>
  );
}
