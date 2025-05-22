import css from './Loader.module.css';

export default function Loader() {
  return (
    <div>
      <div>Loading...</div>
      <div className={css.loader}></div>
    </div>
  );
}