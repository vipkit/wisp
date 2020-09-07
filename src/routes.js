import RouterView from './router-view'
import ArticleRoutes from '@/views/ContentSet/Article/routes'
import BannerRoutes from '@/views/ContentSet/Banner/routes'
import BgImgRoutes from '@/views/ContentSet/BgImg/routes'
import ArticleEntryRoutes from '@/views/ContentSet/ArticleEntry/routes'
import MerchantRoutes from '@/views/Merchant/routes'
import MemberUserRoutes from '@/views/Member/User/routes'

export const childRoutes = [
  MemberUserRoutes,
  MerchantRoutes,
  ArticleRoutes,
  BannerRoutes,
  BgImgRoutes,
  ArticleEntryRoutes
]