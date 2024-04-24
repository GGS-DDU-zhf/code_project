
import Home from '../views/home/Home'
import Center from '../views/center/Center'
import UserAdd from '../views/user-manage/UserAdd'
import UserList from '../views/user-manage/UserList'
import NewsAdd from '../views/news-manage/NewsAdd'
import NewsList from '../views/news-manage/NewsList'
import ProductAdd from '../views/product-manage/ProductAdd'
import ProductList from '../views/product-manage/ProductList'
import NotFound from '../views/notfound/NotFound'

const routes = [
    {
        path: '/index',
        name: 'Home',
        component: Home
    },
    {
        path: '/center',
        name: 'Center',
        component: Center
    },
    {
        path: '/user-manage/add',
        name: 'UserAdd',
        component: UserAdd,
        requireAdmin: true
    },
    {
        path: '/user-manage/list',
        name: 'UserList',
        component: UserList,
        requireAdmin: true
    },
    {
        path: '/news-manage/add',
        name: 'NewsAdd',
        component: NewsAdd
    },
    {
        path: '/news-manage/list',
        name: 'NewsList',
        component: NewsList
    },
    {
        path: '/product-manage/add',
        name: 'ProductAdd',
        component: ProductAdd
    },
    {
        path: '/product-manage/list',
        name: 'ProductList',
        component: ProductList
    },
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]

export default routes