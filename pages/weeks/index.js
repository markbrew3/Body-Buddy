/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getPrevWeeks } from '../../API/apiData';
import WeekCard from '../../components/WeekCard';

export default function WeeksPage() {
  const { user } = useAuth();
  const [weeks, setWeeks] = useState([]);
  const getAllPrevWeeks = () => {
    getPrevWeeks(user.uid).then(setWeeks);
  };

  useEffect(() => {
    getAllPrevWeeks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <h1 style={{ textAlign: 'center', marginBottom: '0px', marginTop: '10px' }}>Previous Week's Completion</h1>
      <div
        className="d-flex justify-content-center"
        style={{
          maxWidth: '1900px',
          margin: '0 auto',
        }}
      >
        <div
          className="d-flex justify-content-center flex-wrap"
          style={{
            margin: '0px',
          }}
        >
          {weeks.map((obj) => <WeekCard key={obj.firebaseKey} weekObj={obj} weekObjDisplay={obj} />)}
        </div>
      </div>
    </>
  );
}
