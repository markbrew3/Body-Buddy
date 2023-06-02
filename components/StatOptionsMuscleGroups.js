import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default function StatOptionsMuscleGroups({ setMuscleGroup }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const filterMusclesOptions = ['All', 'Traps', 'Front Delts', 'Rear/Side Delts', 'Back', 'Chest', 'Biceps', 'Triceps', 'Quads', 'Hamstrings', 'Glutes', 'Calves'];
  const handleButtonState = (targetValue) => {
    setMuscleGroup(targetValue);
  };
  return (
    <>
      <div style={{ marginBottom: '0px', marginTop: '0px' }} className="d-flex align-self-center">
        {filterMusclesOptions.map((category, index) => (
          selectedIndex === index ? <Button variant="dark" className="stat-filter-button-muscles-active" value={category} onClick={handleButtonState}>{category}</Button>
            : (
              <Button
                variant="light"
                className="stat-filter-button-muscles"
                value={category}
                onClick={(e) => {
                  setSelectedIndex(index);
                  handleButtonState(e.target.value);
                }}
              >{category}
              </Button>
            )
        ))}
      </div>
    </>
  );
}

StatOptionsMuscleGroups.propTypes = {
  setMuscleGroup: PropTypes.string.isRequired,
};
