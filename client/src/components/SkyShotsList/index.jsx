import { useMutation } from '@apollo/client';

import { REMOVE_SKYSHOT } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
// import SkyShotsList from '../../pages/Home';

const SkyShotsList = ({ SkyShots, isLoggedInUser = false }) => {
  const [removeSkyShot, { error }] = useMutation
  (REMOVE_SKYSHOT, {
    refetchQueries: [
      QUERY_ME,
      'me'
    ]
  });

  const handleRemoveSkyShot = async (SkyShot) => {
    try {
      const { data } = await removeSkyShot({
        variables: { SkyShot },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!SkyShotsList.length) {
    return <h3>No SkyShots Yet</h3>;
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {SkyShots &&
          SkyShots.map((SkyShot) => (
            <div key={SkyShot} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                  <span>{SkyShot}</span>
                  {isLoggedInUser && (
                    <button
                      className="btn btn-sm btn-danger ml-auto"
                      onClick={() => handleRemoveSkyShot(SkyShotsList)}
                    >
                      X
                    </button>
                  )}
                </h4>
              </div>
            </div>
          ))}
      </div>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default SkyShotsList;
