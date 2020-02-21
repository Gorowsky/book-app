import React from 'react';
import { InputLabel, FormControl, Select, MenuItem, RadioGroup, FormControlLabel, FormLabel, Radio } from '@material-ui/core';
import classes from './BookFilter.module.scss';

const BookFilter = props => {
  const { onGenreFilter, genres, genreChoosen, genderChoosen, onGenderFilter } = props;
  return <div className={classes.FilterHolder}>
    <div className={classes.GenreFilter}>
      <FormControl>
        <InputLabel id="genre-select-label">Genre</InputLabel>
        <Select
          labelId="genre-select-label"
          id="genre-select"
          value={genreChoosen}
          onChange={({ target: { value } }) => onGenreFilter(value)}
        >
          <MenuItem key={`genre-filter-none`} value="">None</MenuItem>
          { genres.map((genre, i) => <MenuItem key={`genre-filter-${i}`} value={genre}>{genre}</MenuItem>) }
        </Select>
      </FormControl>
    </div>
    <div className={classes.GenderFilter}>
      <FormControl>
        <FormLabel>Gender</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={genderChoosen} onChange={({ target: { value } }) => onGenderFilter(value)}>
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="" control={<Radio />} label="None" />
        </RadioGroup>
      </FormControl>
    </div>
  </div>;
};

export default BookFilter;

