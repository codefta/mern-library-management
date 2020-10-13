import React from 'react'
import Select from 'react-select'
import { useField } from 'formik'

const SelectFieldEdit = ({ name, ...selectProps }) => {
  const [field, meta, helpers] = useField(name)

  return (
    <Select
      onChange={(v) => helpers.setValue(v)}
      value={field.defaultValue}
      onBlur={() => helpers.setTouched(true)}
      {...selectProps}
    />
  )
}

export default SelectFieldEdit
