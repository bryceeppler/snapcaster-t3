import { create } from "zustand";
import axios from "axios";
import { env } from "./env.mjs";

export interface SingleSearchResult {
  name: string;
  link: string;
  image: string;
  set: string;
  condition: string;
  foil: boolean;
  price: number;
  website: string;
}

export type SealedSearchResult = {
  name: string;
  link: string;
  image: string;
  price: number;
  stock: number;
  website: string;
  language: string;
  tags: string[];
};

export type MultiSearchCard = {
  cardName: string;
  variants: SingleSearchResult[];
};

export type MultiSearchCardState = {
  cardName: string;
  variants: SingleSearchResult[];
  selectedVariant: SingleSearchResult;
  selected: boolean;
};

// type MultiSearchResult =
export interface Website {
  name: string;
  code: string;
  image: string;
}
const websites: Website[] = [
  {
    name: "Aether Vault Games",
    code: "aethervault",
    image:
      "https://bryces-images.s3.us-west-2.amazonaws.com/AetherVaultGames.png",
  },
  {
    name: "Atlas Collectables",
    code: "atlas",
    image: "https://bryces-images.s3.us-west-2.amazonaws.com/atlas.png",
  },
  {
    name: "Border City Games",
    code: "bordercity",
    image:
      "https://i.ibb.co/cvNCbXx/Border-City-Games-Large-85873391-3559-47f7-939a-420461a0033f-201x-removebg-preview.png",
  },
  {
    name: "Chimera Gaming",
    code: "chimera",
    image:
      "https://cdn.shopify.com/s/files/1/0131/2463/2640/files/logo_large.png?v=1672686974",
  },
  {
    name: "The Connection Games",
    code: "connectiongames",
    image: "https://bryces-images.s3.us-west-2.amazonaws.com/connection.png",
  },
  {
    name: "Enter the Battlefield",
    code: "enterthebattlefield",
    image:
      "https://cdn.shopify.com/s/files/1/0496/0098/7297/files/Logo_1_Newmarket_large.jpg?v=1658954718",
  },
  {
    name: "Everything Games",
    code: "everythinggames",
    image:
      "https://cdn.shopify.com/s/files/1/0618/8905/2856/files/Header_76747500-dd40-4d94-8016-a1d21282e094_large.png?v=1650298823",
  },
  {
    name: "Exor Games",
    code: "exorgames",
    image:
      "https://cdn.shopify.com/s/files/1/0467/3083/8169/files/Untitled-2-01.png?v=1613706669",
  },
  {
    name: "Face to Face Games",
    code: "facetoface",
    image: "https://i.ibb.co/W2bPWdK/logo-colored-1.png",
  },
  {
    name: "Fantasy Forged Games",
    code: "fantasyforged",
    image: "https://bryces-images.s3.us-west-2.amazonaws.com/ff.png",
  },
  {
    name: "FirstPlayer",
    code: "firstplayer",
    image: "https://bryces-images.s3.us-west-2.amazonaws.com/firstplayer.png",
  },
  {
    name: "401 Games",
    code: "four01",
    image: "https://i.ibb.co/h9x3Ksb/401games.png",
  },
  {
    name: "Fusion Gaming",
    code: "fusion",
    image: "https://i.ibb.co/GkKmry9/fusiongaminglogo.png",
  },
  {
    name: "GameKnight",
    code: "gameknight",
    image:
      "https://cdn.shopify.com/s/files/1/0367/8204/7276/files/GK-Logo-Full-Text-Below-1-768x603.png?v=1618430878",
  },
  {
    name: "Gamezilla",
    code: "gamezilla",
    image:
      "https://cdn.shopify.com/s/files/1/0570/6308/0145/files/Screen_Shot_2018-09-07_at_1.02.57_PM_copy_141x.png?v=1626814255",
  },
  {
    name: "Gauntlet Games",
    code: "gauntlet",
    image:
      "http://cc-client-assets.s3.amazonaws.com/store/gauntletgamesvictoria/7c8176e703db451bad3277bb6d4b8631/medium/Transparent_logo.png",
  },
  {
    name: "Hairy Tarantula",
    code: "hairyt",
    image:
      "https://cdn.shopify.com/s/files/1/0266/9513/9533/files/hariyt-horizontal-logo.png?v=1615403256",
  },
  {
    name: "House of Cards",
    code: "houseofcards",
    image: "https://i.ibb.co/qnytc5Q/house-of-cards-logo.png",
  },
  {
    name: "Jeux 3 Dragons",
    code: "jeux3dragons",
    image: "https://bryces-images.s3.us-west-2.amazonaws.com/jeux3dragons.png",
  },
  {
    name: "Manaforce",
    code: "manaforce",
    image: "https://bryces-images.s3.us-west-2.amazonaws.com/manaforce.png",
  },
  {
    name: "Magic Stronghold",
    code: "magicstronghold",
    image:
      "https://magicstronghold-images.s3.amazonaws.com/customizations/logo.png",
  },
  {
    name: "Orchard City Games",
    code: "orchardcity",
    image:
      "https://d1rw89lz12ur5s.cloudfront.net/store/orchardcitygames/eb6cb32f84b34b5cbb1c025fc41c9821/large/logo_v1.png",
  },
  {
    name: "Sequence Gaming Brockville",
    code: "sequencegaming",
    image:
      "https://bryces-images.s3.us-west-2.amazonaws.com/sequence-no-bg-inverted.png",
  },
  {
    name: "The Comic Hunter",
    code: "thecomichunter",
    image: "https://bryces-images.s3.us-west-2.amazonaws.com/ComicHunter.png",
  },
  {
    name: "Topdeck Hero",
    code: "topdeckhero",
    image: "https://bryces-images.s3.us-west-2.amazonaws.com/topdeckhero.png",
  },
  {
    name: "Wizard's Tower (kanatacg)",
    code: "kanatacg",
    image: "https://i.ibb.co/hm3qKWc/wizardstower-removebg-preview.png",
  },
];

export type FilterTag = {
  name: string;
  displayName: string;
  selected: boolean;
};

export type PriceListEntry = {
  price: number;
  website: string;
  foil: boolean;
  condition: string;
};

export type CardPrices = {
  image: string;
  max: number;
  min: number;
  avg: number;
  foil_max?: number;
  foil_min?: number;
  foil_avg?: number;
  priceList: PriceListEntry[];
  date: string;
};

type State = {
  singleSearchStarted: boolean;
  priceChartLoading: boolean;
  fetchPriceChart: (cardName: string) => Promise<void>;
  sortMultiSearchVariants: (
    card: MultiSearchCardState,
    orderBy: string
  ) => void;
  calculateSetMultiSearchSelectedCost: () => void;
  multiSearchSelectedCost: number;
  missingMultiSearchResults: string[];
  resetMultiSearch: () => void;
  selectAllMultiSearchResults: () => void;
  websites: Website[];
  singleSearchInput: string;
  setSingleSearchInput: (singleSearchInput: string) => void;
  singleSearchQuery: string;
  setSingleSearchQuery: (singleSearchQuery: string) => void;

  multiSearchInput: string;
  multiSearchQuery: string;
  multiSearchSelectedWebsites: string[];
  toggleMultiSearchSelectedWebsites: (website: string) => void;
  setMultiSearchInput: (multiSearchInput: string) => void;
  setMultiSearchQuery: (multiSearchQuery: string) => void;
  singleSearchOrderBy: string;
  setSingleSearchOrderBy: (singleSearchOrderBy: string) => void;
  singleSearchOrder: string;
  setSingleSearchOrder: (singleSearchOrder: string) => void;
  toggleSelectMultiSearchCard: (cardName: string) => void;
  singleSearchResults: SingleSearchResult[];
  setSingleSearchResults: (singleSearchResults: SingleSearchResult[]) => void;

  showSingleSearchFilters: boolean;
  toggleShowSingleSearchFilters: () => void;
  filteredSingleSearchResults: SingleSearchResult[];
  setFilteredSingleSearchResults: (
    filteredSingleSearchResults: SingleSearchResult[]
  ) => void;
  resetSingleSearchFilters: () => void;
  toggleSingleSearchCondition: (condition: string) => void;
  fetchMultiSearchResults: (multiSearchInput: string) => Promise<void>;
  toggleSingleSearchFoil: () => void;

  singleSearchConditions: {
    [key: string]: boolean;
  };

  singleSearchFoil: boolean;

  singleSearchResultsLoading: boolean;
  setSingleSearchResultsLoading: (singleSearchResultsLoading: boolean) => void;
  fetchSingleSearchResults: (searchInput: string) => Promise<void>;
  filterSingleSearchResults: () => void;
  multiSearchMode: string;
  toggleMultiSearchSelectAllStores: () => void;
  multiSearchResultsLoading: boolean;
  multiSearchResults: MultiSearchCard[];
  filteredMultiSearchResults: MultiSearchCardState[];
  updateSelectedVariant: (
    cardName: string,
    variant: SingleSearchResult
  ) => void;

  // Sealed Search
  sealedSearchResults: SealedSearchResult[];
  sealedSearchQuery: string;
  filteredSealedSearchResults: SealedSearchResult[];
  sealedSearchOrderBy: "price" | "website";
  sealedSearchOrder: "asc" | "desc";
  sealedFilterTags: FilterTag[];
  toggleSealedFilterTag: (tag: FilterTag) => void;
  sealedSearchResultsLoading: boolean;
  sealedSearchInput: string;
  setSealedSearchInput: (sealedSearchInput: string) => void;
  fetchSealedSearchResults: (sealedSearchInput: string) => Promise<void>;
  filterSealedSearchResults: () => void;
  setSealedSearchOrderBy: (sealedSearchOrderBy: "price" | "website") => void;
  setSealedSearchOrder: (sealedSearchOrder: "asc" | "desc") => void;
  singleSearchPriceList?: CardPrices[];
  sealedSearchHasResults: boolean;
};

export const useStore = create<State>((set, get) => ({
  sealedSearchHasResults: false,
  singleSearchStarted: false,
  priceChartLoading: false,
  singleSearchPriceList: undefined,
  fetchPriceChart: async (cardName) => {
    set({ priceChartLoading: true });
    // encode cardName as utf-8
    const response = await axios.post(
      `${env.NEXT_PUBLIC_SNAPCASTER_API_URL}/prices/`,
      {
        cardName: cardName,
      }
    );
    console.log(response.data);
    set({ singleSearchPriceList: response.data as CardPrices[] });
    set({ priceChartLoading: false });
  },
  setSealedSearchOrderBy: (sealedSearchOrderBy) => {
    set({ sealedSearchOrderBy });
    get().filterSealedSearchResults();
  },
  setSealedSearchOrder: (sealedSearchOrder) => {
    set({ sealedSearchOrder });
    get().filterSealedSearchResults();
  },
  sealedSearchOrderBy: "price",
  sealedSearchOrder: "asc",
  sealedFilterTags: [
    {
      name: "pack",
      displayName: "Pack",
      selected: true,
    },
    {
      name: "draft",
      displayName: "Draft",
      selected: true,
    },
    {
      name: "jumpstart",
      displayName: "Jumpstart",
      selected: true,
    },
    {
      name: "set",
      displayName: "Set",
      selected: true,
    },
    {
      name: "collector",
      displayName: "Collector",
      selected: true,
    },
    {
      name: "bundle",
      displayName: "Bundle",
      selected: true,
    },
    {
      name: "box",
      displayName: "Box",
      selected: true,
    },
  ],
  toggleSealedFilterTag: (tag: FilterTag) => {
    // toggle the selected field of the tag
    // update the selectedTags array
    const sealedFilterTags = get().sealedFilterTags;
    // if the selected tag is the only one selected, don't toggle it
    const selectedTags = sealedFilterTags.filter(
      (sealedFilterTag) => sealedFilterTag.selected
    );
    if (selectedTags.length === 1 && selectedTags[0]?.name === tag.name) {
      return;
    }
    const newSealedFilterTags = sealedFilterTags.map((sealedFilterTag) => {
      if (sealedFilterTag.name === tag.name) {
        return { ...sealedFilterTag, selected: !sealedFilterTag.selected };
      }
      return sealedFilterTag;
    });
    set({ sealedFilterTags: newSealedFilterTags });
    get().filterSealedSearchResults();
  },
  filterSealedSearchResults: () => {
    const sealedSearchResults = get().sealedSearchResults;
    const sealedFilterTags = get().sealedFilterTags;
    const filteredSealedSearchResults = sealedSearchResults.filter(
      (sealedSearchResult) => {
        // if the sealedSearchResult has a tag that is selected, return true
        // otherwise return false
        const selectedTags = sealedFilterTags.filter(
          (sealedFilterTag) => sealedFilterTag.selected
        );
        const selectedTagNames = selectedTags.map(
          (selectedTag) => selectedTag.name
        );
        const hasSelectedTag = sealedSearchResult.tags.some((tag) =>
          selectedTagNames.includes(tag)
        );
        return hasSelectedTag;
      }
    );
    // apply the order by and order
    const sealedSearchOrderBy = get().sealedSearchOrderBy;
    const sealedSearchOrder = get().sealedSearchOrder;
    if (sealedSearchOrderBy === "price") {
      if (sealedSearchOrder === "asc") {
        filteredSealedSearchResults.sort((a, b) => a.price - b.price);
      } else {
        filteredSealedSearchResults.sort((a, b) => b.price - a.price);
      }
    } else {
      if (sealedSearchOrder === "asc") {
        filteredSealedSearchResults.sort((a, b) =>
          a.website.localeCompare(b.website)
        );
      } else {
        filteredSealedSearchResults.sort((a, b) =>
          b.website.localeCompare(a.website)
        );
      }
    }
    set({ filteredSealedSearchResults });
  },

  sealedSearchInput: "",
  sealedSearchQuery: "",
  sealedSearchResults: [],
  filteredSealedSearchResults: [],
  setSealedSearchInput: (sealedSearchInput) => set({ sealedSearchInput }),
  sealedSearchResultsLoading: false,
  fetchSealedSearchResults: async (searchInput: string) => {
    set({ sealedSearchResultsLoading: true });
    const response = await axios.post(
      `${env.NEXT_PUBLIC_SNAPCASTER_API_URL}/search/sealed/`,
      {
        setName: searchInput,
        websites: ["all"],
      }
    );
    const results = response.data as SealedSearchResult[];
    // sort results by ascending price
    // results = [SingleSearchResult, SingleSearchResult, ...]
    // SingleSearchResult = { name: string, link: string, image: string, set: string, condition: string, foil: boolean, price: number, website: string }
    results.sort((a: SealedSearchResult, b: SealedSearchResult) => {
      return a.price - b.price;
    });

    set({ sealedSearchHasResults: true });
    set({ filteredSealedSearchResults: results });
    set({ sealedSearchResults: results });
    set({ sealedSearchResultsLoading: false });
    set({ sealedSearchQuery: searchInput });
  },

  sortMultiSearchVariants: (card, orderBy) => {
    const filteredMultiSearchResults = get().filteredMultiSearchResults;
    const cardIndex = filteredMultiSearchResults.findIndex(
      (c) => c.cardName === card.cardName
    );
    const cardToSort = filteredMultiSearchResults[cardIndex];
    if (!cardToSort) {
      return;
    }
    const sortedVariants =
      cardToSort &&
      cardToSort.variants.sort((a, b) => {
        if (orderBy === "price") {
          return a.price - b.price;
        }
        if (orderBy === "condition") {
          return a.condition.localeCompare(b.condition);
        }
        if (orderBy === "website") {
          return a.website.localeCompare(b.website);
        }
        return 0;
      });
    // Since we did .sort, which sorts in place I think we can remove the newCard object to avoid duping memory
    const newCard: MultiSearchCardState = {
      ...cardToSort,
      variants: sortedVariants,
    };
    const newFilteredMultiSearchResults = [
      ...filteredMultiSearchResults.slice(0, cardIndex),
      newCard,
      ...filteredMultiSearchResults.slice(cardIndex + 1),
    ];
    set({ filteredMultiSearchResults: newFilteredMultiSearchResults });
  },

  calculateSetMultiSearchSelectedCost: () => {
    const filteredMultiSearchResults = get().filteredMultiSearchResults;
    // if the length is 0, set to 0
    if (filteredMultiSearchResults.length === 0) {
      set({ multiSearchSelectedCost: 0 });
      return;
    }
    const selectedCards = filteredMultiSearchResults.filter(
      (card) => card.selected
    );
    const selectedCardsCost = selectedCards.reduce((acc, card) => {
      return acc + card.selectedVariant.price;
    }, 0);
    set({ multiSearchSelectedCost: selectedCardsCost });
  },

  multiSearchSelectedCost: 0,
  missingMultiSearchResults: [],
  resetMultiSearch: () => {
    // set multie search mode to search
    set({ multiSearchMode: "search" });
  },
  selectAllMultiSearchResults: () => {
    const multiSearchResults = get().filteredMultiSearchResults;
    // if all card.selected are true, set all to false
    if (multiSearchResults.every((card) => card.selected)) {
      const newMultiSearchResults = multiSearchResults.map((card) => {
        return {
          ...card,
          selected: false,
        };
      });
      set({ filteredMultiSearchResults: newMultiSearchResults });
      get().calculateSetMultiSearchSelectedCost();
      return;
    }
    // Otherwise, set all to true
    // set teach card.selected to true
    const newMultiSearchResults = multiSearchResults.map((card) => {
      return {
        ...card,
        selected: true,
      };
    });
    set({ filteredMultiSearchResults: newMultiSearchResults });
    get().calculateSetMultiSearchSelectedCost();
  },

  websites: websites,
  singleSearchInput: "",
  setSingleSearchInput: (singleSearchInput: string) =>
    set({ singleSearchInput }),
  showSingleSearchFilters: false,
  multiSearchInput: "",
  multiSearchQuery: "",
  setMultiSearchInput: (multiSearchInput: string) => set({ multiSearchInput }),
  setMultiSearchQuery: (multiSearchQuery: string) => set({ multiSearchQuery }),
  toggleShowSingleSearchFilters: () =>
    set({ showSingleSearchFilters: !get().showSingleSearchFilters }),
  singleSearchQuery: "",

  singleSearchConditions: {
    nm: true,
    lp: true,
    pl: true,
    mp: true,
    hp: true,
    dmg: true,
    scan: true,
    scn: true,
  },

  singleSearchFoil: false,
  toggleSingleSearchFoil: () => {
    set({ singleSearchFoil: !get().singleSearchFoil });
    // call filter function
    get().filterSingleSearchResults();
  },

  setSingleSearchQuery: (singleSearchQuery: string) =>
    set({ singleSearchQuery }),
  singleSearchResults: [],
  filteredSingleSearchResults: [],
  setFilteredSingleSearchResults: (
    filteredSingleSearchResults: SingleSearchResult[]
  ) => set({ filteredSingleSearchResults }),
  setSingleSearchResults: (singleSearchResults: SingleSearchResult[]) =>
    set({ singleSearchResults }),
  singleSearchResultsLoading: false,

  multiSearchResultsLoading: false,
  setSingleSearchResultsLoading: (singleSearchResultsLoading: boolean) =>
    set({ singleSearchResultsLoading }),

  fetchMultiSearchResults: async (multiSearchInput: string) => {
    set({ multiSearchResultsLoading: true });
    const selectedWebsites = get().multiSearchSelectedWebsites;
    const websiteCodes = selectedWebsites.map((website) => {
      return get().websites.find((w) => w.name === website)?.code;
    });
    console.log("multiSearchInput: ", multiSearchInput);
    const cardNames = multiSearchInput.split("\n");
    // remove any empty strings
    const filteredCardNames = cardNames.filter((cardName) => cardName !== "");
    // match each website to it's code
    const response = await axios.post(
      `${env.NEXT_PUBLIC_SNAPCASTER_API_URL}/search/bulk/`,
      {
        cardNames: filteredCardNames,
        websites: websiteCodes,
        worstCondition: "nm",
      }
    );
    const results = response.data as MultiSearchCard[];
    // sort results by ascending price
    // results.sort((a: MultiSearchCard, b: MultiSearchCard) => {
    //   return a.price - b.price;
    // });
    // for card in results
    for (let i = 0; i < results.length; i++) {
      // sort card's results by ascending price
      results[i]?.variants.sort(
        (a: SingleSearchResult, b: SingleSearchResult) => {
          return a.price - b.price;
        }
      );
    }
    // construct filteredMultiSearchResults by adding a 'selected' property to each card, and a 'selectedVariant' property to each card
    const filteredResults = results.map((card: MultiSearchCard) => {
      return {
        ...card,
        selected: true,
        selectedVariant: card.variants[0],
      };
    });

    set({
      filteredMultiSearchResults: filteredResults as MultiSearchCardState[],
    });
    // set({ filteredMultiSearchResults: results });
    set({ multiSearchResults: results });
    set({ multiSearchResultsLoading: false });
    set({ multiSearchQuery: multiSearchInput });
    set({ multiSearchMode: "results" });
    // set missingMultiSearchResults to the card name in filteredCardNames that is not in results
    const missingMultiSearchResults = filteredCardNames.filter((cardName) => {
      return !results.find(
        (card: MultiSearchCard) =>
          card.cardName.toLowerCase() === cardName.toLowerCase()
      );
    });
    set({ missingMultiSearchResults });
    get().calculateSetMultiSearchSelectedCost();
  },
  multiSearchResults: [],
  filteredMultiSearchResults: [],

  fetchSingleSearchResults: async (searchInput: string) => {
    set({ singleSearchStarted: true });
    set({ singleSearchResultsLoading: true });
    const response = await axios.post(
      `${env.NEXT_PUBLIC_SNAPCASTER_API_URL}/search/single/`,
      {
        cardName: searchInput,
        websites: ["all"],
      }
    );
    const results = response.data as SingleSearchResult[];
    // sort results by ascending price
    // results = [SingleSearchResult, SingleSearchResult, ...]
    // SingleSearchResult = { name: string, link: string, image: string, set: string, condition: string, foil: boolean, price: number, website: string }
    results.sort((a: SingleSearchResult, b: SingleSearchResult) => {
      return a.price - b.price;
    });

    set({ filteredSingleSearchResults: results });
    set({ singleSearchResults: results });
    set({ singleSearchResultsLoading: false });
    set({ singleSearchQuery: searchInput });
  },

  multiSearchMode: "search",
  filterSingleSearchResults: () => {
    const conditions = get().singleSearchConditions;
    const foil = get().singleSearchFoil;
    const results = get().singleSearchResults;
    const orderBy = get().singleSearchOrderBy;
    const order = get().singleSearchOrder;
    const filteredResults = results.filter((result: SingleSearchResult) => {
      return (
        conditions[result.condition.toLowerCase()] &&
        (foil ? result.foil : true)
      );
    });
    // sort by orderBy in order
    filteredResults.sort((a: SingleSearchResult, b: SingleSearchResult) => {
      if (orderBy === "price") {
        if (order === "asc") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      } else if (orderBy === "name") {
        if (order === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      } else if (orderBy === "set") {
        if (order === "asc") {
          return a.set.localeCompare(b.set);
        } else {
          return b.set.localeCompare(a.set);
        }
      } else if (orderBy === "website") {
        if (order === "asc") {
          return a.website.localeCompare(b.website);
        } else {
          return b.website.localeCompare(a.website);
        }
      } else {
        return 0;
      }
    });

    set({ filteredSingleSearchResults: filteredResults });
  },

  toggleSingleSearchCondition: (condition: string) => {
    // toggle the condition in singleSearchConditions
    set({
      singleSearchConditions: {
        ...get().singleSearchConditions,
        [condition]: !get().singleSearchConditions[condition],
      },
    });

    // call filterSingleSearchResults
    get().filterSingleSearchResults();
  },

  resetSingleSearchFilters: () => {
    // set all conditions to true
    set({
      singleSearchConditions: {
        nm: true,
        lp: true,
        pl: true,
        mp: true,
        hp: true,
        dmg: true,
        scan: true,
        scn: true,
      },
    });
    // set foil to false
    set({ singleSearchFoil: false });
    // set orderBy to price
    set({ singleSearchOrderBy: "price" });
    // set order to asc
    set({ singleSearchOrder: "asc" });

    // call filterSingleSearchResults
    get().filterSingleSearchResults();
  },

  singleSearchOrder: "asc",
  singleSearchOrderBy: "price",
  setSingleSearchOrder: (singleSearchOrder: string) => {
    set({ singleSearchOrder });
    get().filterSingleSearchResults();
  },
  setSingleSearchOrderBy: (singleSearchOrderBy: string) => {
    set({ singleSearchOrderBy });
    get().filterSingleSearchResults();
  },

  // multiSearchSelectedWebsites = website.name for each website in websites
  multiSearchSelectedWebsites: websites.map((website: Website) => website.name),
  toggleMultiSearchSelectedWebsites: (website: string) => {
    // if website is in multiSearchSelectedWebsites, remove it
    // else add it
    if (get().multiSearchSelectedWebsites.includes(website)) {
      set({
        multiSearchSelectedWebsites: get().multiSearchSelectedWebsites.filter(
          (selectedWebsite: string) => selectedWebsite !== website
        ),
      });
    }
    // else add it
    else {
      set({
        multiSearchSelectedWebsites: [
          ...get().multiSearchSelectedWebsites,
          website,
        ],
      });
    }
  },
  toggleMultiSearchSelectAllStores: () => {
    if (get().multiSearchSelectedWebsites.length === websites.length) {
      set({ multiSearchSelectedWebsites: [] });
    } else {
      set({
        multiSearchSelectedWebsites: websites.map(
          (website: Website) => website.name
        ),
      });
    }
  },
  updateSelectedVariant: (card: string, variant: SingleSearchResult) => {
    set({
      filteredMultiSearchResults: get().filteredMultiSearchResults.map(
        (cardState: MultiSearchCardState) => {
          if (cardState.cardName === card) {
            return {
              ...cardState,
              selectedVariant: variant,
              selected: true,
            };
          } else {
            return cardState;
          }
        }
      ),
    });
    get().calculateSetMultiSearchSelectedCost();
  },
  toggleSelectMultiSearchCard: (card: string) => {
    set({
      filteredMultiSearchResults: get().filteredMultiSearchResults.map(
        (cardState: MultiSearchCardState) => {
          if (cardState.cardName === card) {
            return {
              ...cardState,
              selected: !cardState.selected,
            };
          } else {
            return cardState;
          }
        }
      ),
    });
    get().calculateSetMultiSearchSelectedCost();
  },
}));
