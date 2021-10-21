import React, {
  memo,
  // useState
} from 'react';
// import Modal from 'app/components/Modal';
// import { t } from 'app/i18n';
// import Map from './map';
import Search from './search';
import { IProps } from './type';

const SearchMap = (props: IProps) => {
  // const [isShowModal, setShowModal] = useState(false);
  // const [location, setLocation] = useState({});
  // const toggleModal = () => setShowModal(!isShowModal);
  const {
    value,
    onChange,
    label,
    required,
    // onChangeCoordinates,
    // isButton,
  } = props;

  // const onSave = () => {
  //   onChangeCoordinates(location);
  //   toggleModal();
  // };

  return (
    <div className="mb-6">
      <label>
        <span>{label}</span>
      </label>
      <Search onChangePlace={onChange} defaultValue={value} />
      {required && <p className="text-red-500 text-xl">{required}</p>}
    </div>
  );
};

export default memo(SearchMap);
// {/*{isButton && (*/}
// {/*  <button*/}
// {/*    className="text-green-500"*/}
// {/*    onClick={toggleModal}*/}
// {/*    disabled={!lat || !lng}*/}
// {/*  >*/}
// {/*    {t('view_map')}*/}
// {/*  </button>*/}
// {/*)}*/}
// {/*{lat && lng && (*/}
// {/*  <Modal*/}
// {/*    isShowModal={isShowModal}*/}
// {/*    toggle={() => {*/}
// {/*      setShowModal(!isShowModal);*/}
// {/*    }}*/}
// {/*    header=""*/}
// {/*    body={*/}
// {/*      <Map*/}
// {/*        infoWindow={address}*/}
// {/*        onChangePlace={setLocation}*/}
// {/*        center={{ lat, lng}}*/}
// {/*        height="75vh"*/}
// {/*        zoom={15}*/}
// {/*      />*/}
// {/*    }*/}
// {/*    footer={*/}
// {/*      <>*/}
// {/*        <button className="text-green-500" onClick={onSave}>*/}
// {/*          {t('button.save')}*/}
// {/*        </button>*/}
// {/*        <button className="text-gray-300" onClick={toggleModal}>*/}
// {/*          {t('button.cancel')}*/}
// {/*        </button>*/}
// {/*      </>*/}
// {/*    }*/}
// {/*  />*/}
// {/*)}*/}
