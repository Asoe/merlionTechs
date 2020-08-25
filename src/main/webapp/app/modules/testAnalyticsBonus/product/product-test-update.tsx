import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Grid, Paper, TextField, Button, FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core/';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntityProductTest, updateEntityProductTest, createEntityProductTest, resetProductTest } from './product-test.reducer';
import { IProduct } from 'app/shared/model/product.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProductTestEditProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export const ProductTestEdit = (props: IProductTestEditProps) => {
    const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

    const { productEntity, loading, updating, userId } = props;


    const [form, setValues] = useState({
        id: productEntity.id,
        name: productEntity.name,
        price: productEntity.price,
    });


    const handleInput = event => {
        setValues({
            ...form,
            [event.target.name]: event.target.value
        });
    }



    const handleClose = () => {
        props.history.push('/product');
    };

    useEffect(() => {
        if (isNew) {
            props.resetProductTest();
            form.id = 0;
            form.name = '';
            form.price = 0;
        } else {
            props.getEntityProductTest(userId, props.match.params.id);
        }
    }, []);

    useEffect(() => {
        if (props.updateSuccess) {
            handleClose();
        }
    }, [props.updateSuccess]);

    const handleSubmit = event => {
        event.preventDefault();
        const entity = {
            ...productEntity,
            name: form.name,
            price: Number(form.price),
        };

        if (isNew) {
            props.createEntityProductTest(userId, entity);
        } else {
            props.updateEntityProductTest(userId, entity);
        }
        props.history.push('/');
    }


    return (
        <div>
            <Paper>
                <h2 className="fontMerlion">Product</h2>
                <FormControl onSubmit={handleSubmit}>
                    {!isNew ? (
                        <>
                            &nbsp;
                            <h5 className="fontMerlion" >ID</h5>
                            <TextField
                                name="id"
                                variant="outlined"
                                value={`${productEntity.id}`}
                                disabled={true}
                            />
                        </>
                    ) : (null)}
                    &nbsp;
                    <h5 className="fontMerlion">Name</h5>
                    <TextField
                        name="name"
                        variant="outlined"
                        onChange={handleInput}
                        placeholder={productEntity.name}
                    />
                    &nbsp;
                    <h5 className="fontMerlion">Price</h5>
                    <TextField
                        name="price"
                        variant="outlined"
                        onChange={handleInput}
                        type="number"
                        placeholder={`${productEntity.price}`}
                    />
                    &nbsp;
                    <Button
                        style={{ backgroundColor: "#266ba0", color: "#FFFFFF" }}
                        type="submit"
                        onClick={handleSubmit}>Save</Button>
                    &nbsp;
                    </FormControl>
            </Paper>

        </div>
    );
};

const mapStateToProps = ({ product, testAnalytics }: IRootState) => ({
    productEntity: product.entity,
    loading: product.loading,
    updating: product.updating,
    updateSuccess: product.updateSuccess,
    userId: testAnalytics.userId,
});

const mapDispatchToProps = {
    getEntityProductTest,
    updateEntityProductTest,
    createEntityProductTest,
    resetProductTest,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductTestEdit);
