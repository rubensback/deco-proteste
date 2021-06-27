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
  { label: 'Beja', value: 'beja' },
  { label: 'Braga', value: 'braga' },
  { label: 'Bragança', value: 'bragança' },
  { label: 'Branco', value: 'branco' },
  { label: 'Coimbra', value: 'coimbra' },
  { label: 'Évora', value: 'evora' },
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

const Control = ({ goBack }) => {
  const { addConcelho } = useConcelhos();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async data => {
      const concelho = await addConcelho(data);

      if (concelho) goBack(0);
    },
    [addConcelho, goBack],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} xs={12}>
        <Grid item xs={12}>
          <Input
            name="country"
            label="Country"
            required
            register={register}
            watch={watch}
            errors={errors}
            options={[{ label: 'Portugal', value: 'portugal' }]}
            disabled
            defaultValue="portugal"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            name="distrito"
            label="Distrito"
            watch={watch}
            required
            register={register}
            errors={errors}
            options={distritos}
            placeholder="Select Distrito"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            name="name"
            label="Name"
            watch={watch}
            required
            register={register}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            name="acronym"
            label="Acronym"
            watch={watch}
            register={register}
            errors={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            name="initialZipcode"
            label="Initial Zip Code"
            watch={watch}
            register={register}
            errors={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            name="finalZipCode"
            label="Final Zip Code"
            watch={watch}
            register={register}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12}>
          <Checkbox name="active" label="Active?" register={register} />
        </Grid>

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
      </Grid>
    </form>
  );
};

export default Control;
