import React, { useEffect } from 'react';
import { t } from 'app/i18n';
import ButtonGroup from 'app/components/Form/ButtonGroup';
import Table from 'app/components/Table';
// import MediaCarousel from 'app/components/MediaCarousel';
import { formatTime } from 'app/utils';
import { IProps } from './ListAmenity.type';

const ListAmenity = (props: IProps) => {
  const {
    fetching,
    GET_AMENITIES,
    ON_EDIT,
    match,
    ON_DELETE,
    setData,
    data,
  } = props;

  const amenityCategoryId = match?.params?.id;

  useEffect(() => {
    (async () => {
      const res = await GET_AMENITIES(amenityCategoryId);
      setData(res);
    })();
  }, []);

  return (
    <Table
      data={data}
      columns={[
        {
          Header: t('APP.AMENITY.ENGLISH'),
          accessor: 'nameEn',
          Cell: ({ row }: any) => {
            const name = row.original;
            const nameItem = name.name;
            const nameVi = Object.values(nameItem);
            return nameVi[0];
          },
        },
        {
          Header: t('APP.AMENITY.VIETNAM'),
          accessor: 'nameVi',
          Cell: ({ row }: any) => {
            const name = row.original;
            const nameItem = name.name;
            const nameVi = Object.values(nameItem);
            return nameVi[1];
          },
        },
        {
          Header: t('APP.TABLE.AMENITY_CATEGORY_KEYWORD'),
          accessor: 'keyword',
        },
        // {
        //   Header: t('APP.MEDIA_CONTENTS'),
        //   accessor: 'icon',
        //   Cell: ({ row }: any) => {
        //     const media = row?.original?.icon;
        //     return <MediaCarousel data={media} />;
        //   },
        // },
        {
          Header: t('app.table.createdat'),
          accessor: 'createdAt',
          Cell: ({ row }: any) => formatTime(row?.original?.createdAt),
        },
        {
          Header: (
            <div className="flex w-full items-center justify-center">
              {t('user.action')}
            </div>
          ),
          sortable: false,
          maxWidth: 150,
          Cell: ({ row }: any) => {
            const original = row?.original;
            return (
              <ButtonGroup
                onDelete={() => ON_DELETE(original?.id, amenityCategoryId)}
                onEdit={() => ON_EDIT(original?.id)}
              />
            );
          },
        },
      ]}
      pageSize={20}
    />
  );
};

export default ListAmenity;
