import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ onInputChange }) => {
  return (
    <form className={css.form}>
      <label className={css.label}>
        Find contacts by name
        <input
          className={css.input}
          type="text"
          onChange={e => onInputChange(e.target.value)}
        />
      </label>
    </form>
  );
};

Filter.propTypes = {
  onInputChange: PropTypes.func,
};
