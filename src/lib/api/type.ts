export interface Language {
  name: string;
  url: string;
}

export interface PokemonLanguage {
  name: string;
  language: Language;
}

export interface PokemonAbilityFlavor {
  flavor_text: string;
  language: Language;
  version_group: Language;
}

export interface PokemonFlavor {
  flavor_text: string;
  language: Language;
  version: Language;
}

export interface PokemonType {
  slot: number;
  type: Language;
}

export interface PokemonAbility {
  slot: number;
  is_hidden: boolean;
  ability: Language;
}

export interface GetPokemonParams {
  number: number;
  language: string;
  shiny: boolean;
}
