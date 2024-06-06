
import { OptionType, categorys } from "@/lib/categorys"
import Select, { MultiValue, StylesConfig, ActionMeta } from "react-select";
import makeAnimated from 'react-select/animated'

const animatedComponents = makeAnimated()

const customStyles: StylesConfig<OptionType> = {
    // input
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#0D1D25', // Cor de fundo do input
      color: '#FFFAF1', // Cor do texto
      height: 48,
      borderRadius: 8,
      marginTop: 12,
      borderColor: state.isFocused ? '#0D161B' : '#192227', // Cor da borda
      boxShadow: state.isFocused ? '0 0 0 2px #4D585E' : 'none',
      '&:hover': {
        color: "E1E1E6"
      }
    }),

    // menu
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#0D161B', // Cor de fundo do menu
      color: '#FFFAF1', // Cor do texto do menu
      borderRadius: 8,
      paddingLeft: 8,
      paddingRight: 8
    }),
    // options
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#192227' : state.isFocused ? '#192227' : 'none',
      borderRadius: 8,
      color: '#E1E1E6',
      '&:hover': {
        backgroundColor: '#192227'
      }
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#76797B', // Cor de fundo das opções selecionadas
      borderRadius: 8,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 4,
      paddingBottom: 4
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#E1E1E6', // Cor do texto das opções selecionadas
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#fff',
      ':hover': {
        backgroundColor: 'none',
        color: '#2d2d2d',
      },
    }),
};

interface InputSelectProps {
    category: OptionType[]
    handleNewCategory: any
}

export function InputSelect({category, handleNewCategory}: InputSelectProps) {    

    return (
      <Select
        value={category}
        isMulti
        name="category"
        options={categorys}
        styles={customStyles}
        classNamePrefix="select"
        onChange={handleNewCategory}
        components={animatedComponents}
        placeholder='Selecione uma ou mais categorias'
      />
    )
}