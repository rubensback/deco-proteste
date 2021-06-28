import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Grid } from '@material-ui/core';
import Input from '../../../components/Input';
import Checkbox from '../../../components/Checkbox';
import { useConcelhos } from '../../../hooks/concelho';

const schema = yup.object().shape({
  country: yup.string().required(),
  distrito: yup.string().required(),
  name: yup.string().required(),
  acronym: yup.string(),
  initialZipcode: yup.string(),
  finalZipcode: yup.string(),
  active: yup.boolean(),
});

const distritos = [
  { label: 'Aveiro', value: 'aveiro' },
  { label: 'Alcobaça', value: 'alcobaça' },
  { label: 'Beja', value: 'beja' },
  { label: 'Braga', value: 'braga' },
  { label: 'Bragança', value: 'bragança' },
  { label: 'Branco', value: 'branco' },
  { label: 'Coimbra', value: 'coimbra' },
  { label: 'Évora', value: 'évora' },
  { label: 'Faro', value: 'faro' },
  { label: 'Guarda', value: 'guarda' },
  { label: 'Leiria', value: 'leiria' },
  { label: 'Lisboa', value: 'lisboa' },
  { label: 'Portalegre', value: 'portalegre' },
  { label: 'Porto', value: 'porto' },
  { label: 'Santarém', value: 'santarém' },
  { label: 'Setúbal', value: 'setúbal' },
  { label: 'Viana do Castelo', value: 'vianaDoCastelo' },
  { label: 'Real', value: 'real' },
  { label: 'Viseu', value: 'viseu' },
];

const Control = ({ goBack, concelho, type }) => {
  const { addConcelho, editConcelho } = useConcelhos();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: {
      active: concelho ? concelho.active : false,
    },
  });

  const onSubmit = useCallback(
    async data => {
      let newConcelho;

      if (type === 'new') newConcelho = await addConcelho(data);
      else newConcelho = await editConcelho({ ...data, id: concelho.id });

      if (newConcelho) goBack(0);
    },
    [addConcelho, editConcelho, goBack, concelho, type],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} xs={12}>
        <Grid item xs={12}>
          <Input
            name="country"
            label="Country"
            readOnly={type === 'view'}
            required
            register={register}
            errors={errors}
            options={[{ label: 'Portugal', value: 'portugal' }]}
            disabled
            defaultValue="portugal"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            defaultValue={concelho ? concelho.distrito : ''}
            name="distrito"
            label="Distrito"
            readOnly={type === 'view'}
            required
            register={register}
            errors={errors}
            options={distritos}
            placeholder="Select Distrito"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            defaultValue={concelho ? concelho.name : ''}
            name="name"
            label="Name"
            readOnly={type === 'view'}
            required
            register={register}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            defaultValue={concelho ? concelho.acronym : ''}
            name="acronym"
            label="Acronym"
            readOnly={type === 'view'}
            register={register}
            errors={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            defaultValue={concelho ? concelho.initialZipcode : ''}
            name="initialZipcode"
            label="Initial Zip Code"
            readOnly={type === 'view'}
            register={register}
            errors={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            defaultValue={concelho ? concelho.finalZipCode : ''}
            name="finalZipCode"
            label="Final Zip Code"
            readOnly={type === 'view'}
            register={register}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12}>
          <Checkbox
            name="active"
            label="Active?"
            checked={watch('active')}
            register={register}
          />
        </Grid>

        {type !== 'view' ? (
          <Grid container item xs={12} spacing={1}>
            <Grid item>
              <Button color="primary" type="submit">
                Save
              </Button>
            </Grid>
            <Grid item>
              <Button color="secondary" onClick={goBack}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid item>
            <Button color="primary" onClick={goBack}>
              Back
            </Button>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default Control;
