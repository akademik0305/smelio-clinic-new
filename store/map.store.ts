// imports
import Service from "~/service/Service"
import urls from "~/service/urls"
import type { TAddress, TPositionDetail } from "~/types/map.types"

// types
type TMapPosition = {
  coords: {
    latitude: number
    longitude: number
  }
}
type TPosition = {
  latitude: number
  longitude: number
}


export const useMapStore = defineStore("useMapStore", () => {
  // current user position
  const userPosition = ref<TPosition>()
  // active address
  const activeAddress = ref<TAddress>()
  // is user current position
  const isCorrect = ref(true);
  // current map center addres
  const currentMapCenter = ref<TPositionDetail>()


  //===============================-< set active address >-===============================
  //> variables
  //> functions
  async function setActiveAddress(address: TAddress, locale: string, token: string | null | undefined) {
    const res = await Service.get(urls.changeActiveAddress(address.id), locale, token)
    if (res.status === 200) {
      activeAddress.value = address
    }
  }

  //===============================-< get position detail >-===============================
  //> variables
  const streetName = ref('Manzil aniqlanmoqda')


  //> functions
  /**
   * get street name with lat and long
   * @param {object} [position] -> get position
   */
  async function getPositionDetail(position: TPosition) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.latitude}&lon=${position.longitude}`

    const res: TPositionDetail = await $fetch(url, {
      method: 'GET',
    })


    if (res.address) {
      streetName.value = res.address?.road ? res.address?.road : res.address?.neighbourhood
      currentMapCenter.value = res
    } else {
      streetName.value = "Manzilni aniqlab bo'lmadi"
    }
  }


  // get current position
  async function getUserPosition() {
    function success(position: TMapPosition) {
      userPosition.value = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      getPositionDetail({ latitude: position.coords.latitude, longitude: position.coords.longitude })
    }

    function error() {
      console.log('Unable to retrieve your location')
    }

    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser')
    } else {
      console.log('Loading...')
      navigator.geolocation.getCurrentPosition(success, error)
    }
  }

  return {
    activeAddress,
    userPosition,
    isCorrect,
    streetName,
    currentMapCenter,
    getUserPosition,
    getPositionDetail,
    setActiveAddress
  };
}, {
  persist: {
    // storage: piniaPluginPersistedstate.localStorage(),
  },
});
