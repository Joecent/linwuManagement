const lazy = path => () => import(`@/pages/${path}`)

export default lazy
