import Images from 'app/assets/images';
import { t } from 'app/i18n';
import React from 'react';
import { Row, Col, Button, Input } from 'reactstrap';
import {
  BoxContainer,
  FieldInput,
  AvatarProfile,
  BoxAvatarProfile,
  TextChangeAvatar,
} from './ListProfileStyled';

const FormUiProfile = (props: any) => {
  return (
    <BoxContainer>
      <Row>
        <Col md={4}>
          <BoxAvatarProfile>
            <AvatarProfile src={Images.background.default} alt="avatar" />
            <TextChangeAvatar>{t('profile.change_avatar')}</TextChangeAvatar>
          </BoxAvatarProfile>
        </Col>
        <Col md={8}>
          <Row>
            <Col md={12} className="col">
              <strong>{t('profile.my_file')}</strong>
            </Col>
            <Col md={3} className="col">
              {t('profile.usename')}
            </Col>
            <Col md={9} className="col">
              <FieldInput type="text" value={props?.profile?.name} />
            </Col>
            <Col md={3} className="col">
              {t('profile.email')}
            </Col>
            <Col md={9} className="col">
              {props?.profile?.email?.email}
            </Col>
            <Col md={3} className="col">
              {t('profile.phone')}
            </Col>
            <Col md={9} className="col">
              13335334334 &emsp; <span>{t('profile.change')}</span>
            </Col>
            <Col md={3} className="col">
              {t('profile.gender')}
            </Col>
            <Col md={9} className="col gender">
              <div className="radio">
                <Input type="radio" name="sex" />
                {t('profile.male')}
              </div>
              <div className="radio">
                <Input type="radio" name="sex" />
                {t('profile.female')}
              </div>
              <div className="radio">
                <Input type="radio" name="sex" />
                {t('profile.other')}
              </div>
            </Col>
            <Col md={3} className="col">
              {t('profile.birthday')}
            </Col>
            <Col md={9} className="col">
              <select>
                <option>15</option>
              </select>
              <select>
                <option>05</option>
              </select>
              <select>
                <option>1990</option>
              </select>
            </Col>
            <Col md={3} className="col"></Col>
            <Col md={9} className="col">
              <Button color="success">{'Lưu'}</Button>
            </Col>
            <Col md={12} className="col">
              <strong>{t('profile.password')}</strong>
            </Col>
            <Col md={3} className="col">
              {t('profile.current_password')}
            </Col>
            <Col md={9} className="col">
              <FieldInput type="text" />
            </Col>
            <Col md={3} className="col">
              {t('profile.new_password')}
            </Col>
            <Col md={9} className="col">
              <FieldInput type="text" />
            </Col>
            <Col md={3} className="col">
              {t('profile.verify_password')}
            </Col>
            <Col md={9} className="col">
              <FieldInput type="text" />
            </Col>
            <Col md={3} className="col"></Col>
            <Col md={9} className="col">
              <Button color="success">{t('button.save')}</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </BoxContainer>
  );
};
export default FormUiProfile;
