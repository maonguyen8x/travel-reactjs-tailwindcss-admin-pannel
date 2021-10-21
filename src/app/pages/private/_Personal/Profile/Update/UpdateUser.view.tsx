import React, { useState } from 'react';
import { Row, Button } from 'reactstrap';
import TextInput from 'app/components/Form/TextInput';
import { getFieldProps } from 'app/utils';
import { t } from 'app/i18n';
import { InjectedFormikProps } from 'formik';
import SelectInput from 'app/components/Form/SelectInput';
import { getGenderTypes } from 'app/utils';
import { IProps } from './UpdateUser.type';

export type EnhancedProps = InjectedFormikProps<IProps, any>;

const FormUpdateProfile = (props: EnhancedProps) => {
  const [birthday, setBirthday] = useState(false);

  const [filterValue, setFilterValue] = useState(getGenderTypes()?.[0].value);
  const onChangeSelect = (value: any) => {
    setFilterValue(value);
  };

  return (
    <div className="mt-3" id="loginform">
      <Row>
        <TextInput
          {...getFieldProps('introduce', props)}
          label={t('APP.USERS.INTRODUCE')}
          as="Col"
          md="6"
        />
        <TextInput
          {...getFieldProps('name', props)}
          label={t('APP.USERS.NAME')}
          as="Col"
          md="6"
          disabled
        />
        <SelectInput
          as="Col"
          md={6}
          label={t('APP.USERS.GENDER')}
          value={filterValue}
          onChange={onChangeSelect}
          data={getGenderTypes()}
        />
        {birthday ? (
          <TextInput
            {...getFieldProps('birthday', props)}
            label={t('APP.USERS.BIRTHDAY')}
            type="Date"
            as="Col"
            md="6"
          />
        ) : (
          <TextInput
            {...getFieldProps('birthday', props)}
            label={t('APP.USERS.BIRTHDAY')}
            addon={
              <Button color="warning" onClick={() => setBirthday(true)}>
                {t('APP.USERS.CHANGE_BIRTHDAY')}
              </Button>
            }
            as="Col"
            md="6"
          />
        )}
        <TextInput
          {...getFieldProps('address', props)}
          label={t('APP.USERS.ADDRESS')}
          as="Col"
          md="6"
        />
        <TextInput
          {...getFieldProps('email', props)}
          label={t('APP.USERS.EMAIL')}
          type="email"
          as="Col"
          md="6"
        />
        <TextInput
          {...getFieldProps('website', props)}
          label={t('APP.USERS.WEBSITE')}
          as="Col"
          md="6"
        />
        <TextInput
          {...getFieldProps('phone', props)}
          label={t('APP.USERS.PHONE')}
          as="Col"
          md="6"
        />
        <TextInput
          {...getFieldProps('education', props)}
          label={t('APP.USERS.EDUCATION')}
          as="Col"
          md="6"
        />
        <TextInput
          {...getFieldProps('work', props)}
          label={t('APP.USERS.WORK')}
          as="Col"
          md="6"
        />
      </Row>
    </div>
  );
};
export default FormUpdateProfile;
