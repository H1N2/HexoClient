const localSetting = localStorage.getItem('BASE_SETTING')
    ? JSON.parse(localStorage.getItem('BASE_SETTING'))
    : null
const initialState = {
    baseDir: '',
    ak: '',
    sk: '',
    bucket: '',
    ...localSetting
}
export default function systemReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_BASE_SETTING':
            let data = { ...state, ...action.payload }
            localStorage.setItem('BASE_SETTING', JSON.stringify(data))
            return { ...state, ...action.payload }
        default:
            return state
    }
}
