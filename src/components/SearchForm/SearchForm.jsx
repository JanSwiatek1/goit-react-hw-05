import { useState } from 'react';
import css from './SearchForm.module.css';

export default function SearchForm({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
      if (query.trim() === '') return;
      
    onSubmit(query);
    setQuery('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies..."
        value={query}
        onChange={handleChange}
      />
      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
}