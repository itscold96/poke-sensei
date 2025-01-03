'use client';

import useInfiniteScroll from '@/hooks/useInfinityScroll';
import useInfinityPokemons from '@/hooks/useInfinityPokemons';
import SearchSection from './SearchSection';
import useInfinityTypePokemons from '@/hooks/useInfinityTypePokemons';
import PokemonList from './PokemonList';
import useSearchPokemon from '@/hooks/useSearchPokemon';
import RandomPokemonLoading from '../loading/RandomPokemonLoading';
import MyFavoriteButton from '../button/MyFavoriteButton';
import LanguageToggleButton from '../button/LanguageToggleButton';
import DraggableMenu from '../draggableSearchMenu/DraggableMenu';
import { NOT_FOUND_POKEMON } from '@/constants/searchNotFound';

/**PokemonList 컴포넌트를 UI화 하기위해 컨테이너 컴포넌트를 하나 만들어 관심사를 분리했습니다.
 * 민찬님이 작성해주신 로딩 컴포넌트를 해당 컴포넌트로 이동시켰습니다
 */
export default function PokedexMain() {
  const {
    allPokemonData,
    fetchNextPage: fetchAllPokemonNextPage,
    hasMore,
    isFetchingNextPage: isFetchingPokemon,
  } = useInfinityPokemons();

  const {
    activedTypeNum,
    handleTypeButton,
    handleResetButton,
    typePokemonData,
    fetchTypePokemonNextPage,
    hasMoreType,
    isFetching: isFetchingType,
  } = useInfinityTypePokemons();

  const {
    data: searchedPokemon,
    handleSubmit,
    handleInputChange,
    searchValue,
    handleResetSearchedPokemon,
    filteredPokemon,
    handleClickFilteredPokemon,
    isFetching: isFetchingSearch,
    isModalOpen,
    changeModalOpenValue,
  } = useSearchPokemon();
  const { targetRef, saveScrollPosition } = useInfiniteScroll(() => {
    saveScrollPosition();
    fetchAllPokemonNextPage();
  }, hasMore);
  const { targetRef: typeTargetRef, saveScrollPosition: typePosition } = useInfiniteScroll(
    () => {
      typePosition();
      fetchTypePokemonNextPage();
    },
    hasMoreType,
    activedTypeNum,
  );

  return (
    <>
      {(isFetchingPokemon || isFetchingType) && (
        <div className="backdrop modal-z-index bg-[rgba(168,216,168,0.9)]">
          <RandomPokemonLoading />
        </div>
      )}

      <LanguageToggleButton />
      <MyFavoriteButton />

      <SearchSection
        searchValue={searchValue}
        handleInputChange={handleInputChange}
        activedTypeNum={activedTypeNum}
        handleTypeButton={handleTypeButton}
        handleResetButton={handleResetButton}
        handleSubmit={handleSubmit}
        handleResetSearchedPokemon={handleResetSearchedPokemon}
        filteredPokemon={filteredPokemon.length > 0 ? filteredPokemon : NOT_FOUND_POKEMON}
        handleClickFilteredPokemon={handleClickFilteredPokemon}
        changeModalOpenValue={changeModalOpenValue}
        isModalOpen={isModalOpen}
      />
      {((searchedPokemon && searchedPokemon.pages[0].length > 0) || isFetchingSearch) && (
        <PokemonList pokemonData={searchedPokemon} carousel={false} />
      )}
      {activedTypeNum === null && !(searchedPokemon && searchedPokemon.pages[0].length > 0) && !isFetchingSearch && (
        <PokemonList pokemonData={allPokemonData} targetRef={targetRef} />
      )}
      {!!activedTypeNum && !(searchedPokemon && searchedPokemon.pages[0].length > 0) && !isFetchingSearch && (
        <PokemonList pokemonData={typePokemonData} targetRef={typeTargetRef} carousel={false} />
      )}

      <DraggableMenu>
        <SearchSection
          searchValue={searchValue}
          handleInputChange={handleInputChange}
          activedTypeNum={activedTypeNum}
          handleTypeButton={handleTypeButton}
          handleResetButton={handleResetButton}
          handleSubmit={handleSubmit}
          handleResetSearchedPokemon={handleResetSearchedPokemon}
          changeModalOpenValue={changeModalOpenValue}
          isModalOpen={isModalOpen}
          isModal
        />
      </DraggableMenu>
    </>
  );
}
