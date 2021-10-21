import React, { useEffect, useState } from 'react';
import { pathOr } from 'ramda';
import Table from 'app/components/Table';
import { ROUTERS } from 'app/constants';
import { formatTime, getFieldSos } from 'app/utils';
import { t } from 'app/i18n';
import Header from 'app/components/View/HeaderTable';
import { AvatarStyled, UsernameStyled } from 'app/components/layout/styled';
import Images from 'app/assets/images';
import Modal from 'app/components/Modal';
import {
  BoxICon,
  BoxIconSos,
  BoxImage,
  ImagesSelfieStyled,
} from './ListSos.styled';
import { DATA } from './ListSos.constant';

const ListSosView = ({ fetching = false, history }: any) => {
  const [state, setState] = useState({
    imageSelected: '',
    isShowModalImage: false,
  });

  const { imageSelected, isShowModalImage } = state;

  const onViewImage = (e: any, image: string) => {
    setState({
      ...state,
      isShowModalImage: !isShowModalImage,
      imageSelected: image,
    });
  };

  const onGetListSos = (newFilter: any) => {};

  useEffect(() => {
    //
  }, []);

  const onPageChange = (pageIndex: number) => {
    //
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    //
  };

  const onDetail = (id: string) => {
    history.push(ROUTERS.SOS_DETAIL.replace(':id', id));
  };

  return (
    <div>
      <Modal
        header={t('background_post.image')}
        isShowModal={isShowModalImage}
        toggle={() =>
          setState({
            ...state,
            isShowModalImage: !isShowModalImage,
          })
        }
        body={<img src={imageSelected} alt="img" />}
      />
      <Table
        keySearchDefault={''}
        onSearch={onGetListSos}
        onDetail={onDetail}
        placeholder={t('sos.placeholder')}
        total={DATA?.length}
        data={DATA}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={(column: any) => ({})}
        columns={[
          {
            Header: t('sos.image'),
            accessor: 'image',
            width: 80,
            Cell: ({ row }: any) => {
              const image = row?.original?.image;
              return (
                <ImagesSelfieStyled
                  onClick={(e: any) => onViewImage(e, image)}
                  src={image}
                  alt={''}
                />
              );
            },
          },
          {
            Header: <Header name={t('sos.users')} />,
            accessor: 'users',
            Cell: ({ row }: any) => {
              const avatar = row?.original?.avatar;
              const owner = row?.original?.users;
              return (
                <BoxImage>
                  <AvatarStyled src={avatar} alt={''} />
                  <UsernameStyled>{owner}</UsernameStyled>
                </BoxImage>
              );
            },
          },
          {
            Header: t('sos.phone'),
            accessor: 'phone',
            Cell: ({ row }: any) => pathOr('', ['original', 'phone'], row),
          },
          {
            Header: <Header name={t('sos.rally_point')} />,
            width: 400,
            sortable: false,
            accessor: 'rallyPoint',
            Cell: ({ row }: any) => pathOr('', ['original', 'rallyPoint'], row),
          },
          {
            Header: t('sos.created'),
            center: true,
            accessor: 'createdAt',
            Cell: ({ row }: any) => {
              return formatTime(row?.original?.createdAt);
            },
          },
          {
            Header: t('sos.rescue'),
            center: true,
            sortable: false,
            accessor: 'rescue',
            Cell: ({ row }: any) => pathOr('', ['original', 'rescue'], row),
          },
          {
            Header: t('sos.status'),
            sortable: false,
            accessor: 'status',
            Cell: ({ row }: any) => {
              return (
                <BoxICon>
                  <BoxIconSos src={Images.sos.default} alt="sos" />
                </BoxICon>
              );
            },
          },
        ]}
        pageSize={10}
      />
    </div>
  );
};
export default ListSosView;
