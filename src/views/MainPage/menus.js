import IconMarket from '@/assets/icon-market.svg'
import IconMerchant from '@/assets/icon-merchant.svg'
import IconUser from '@/assets/icon-user.svg'
import IconFinance from '@/assets/icon-finance.svg'
import IconInteractive from '@/assets/icon-interactive.svg'
import IconBrand from '@/assets/icon-brand.svg'
import IconConsume from '@/assets/icon-consume.svg'
import IconRecharge from '@/assets/icon-recharge.svg'
import IconSettings from '@/assets/icon-settings.svg'
import IconShopAward from '@/assets/icon-shop-award.svg'
import IconTicket from '@/assets/icon-ticket.svg'
import IconWxProgram from '@/assets/icon-wx-program.svg'
import IconBrandHomePage from '@/assets/icon-brand-home.svg'
import IconSetting from '@/assets/icon-setting.svg'

export const menus = [{
    title: '内容营销',
    icon: IconFinance,
    index: 'BRAND',
    menuItems: [{
        index: 'decoration-wx',
        title: '内容管理',
        icon: IconWxProgram,
        paths: [{
          name: '图文内容',
          path: '/articles',
        }],
      },
      {
        index: 'decoration-merchant',
        title: '小程序配置',
        icon: IconBrandHomePage,
        paths: [{
            name: '轮播图',
            path: '/banners',
          },
          {
            name: '内容列表',
            path: '/entry',
          },
          {
            name: '活动列表',
            path: '/activities',
          }
        ],
      },
      {
        index: 'DecorationFunction',
        title: '小程序装修',
        icon: IconSetting,
        paths: [{
          name: '会员背景图',
          path: '/bg_img',
        }],
      }
    ],
  },
  {
    title: '会员管理',
    icon: IconMerchant,
    index: 'MEMBER',
    menuItems: [{
      index: 'vips-user',
      title: '会员管理',
      icon: IconUser,
      paths: [{
        name: '会员列表',
        path: '/user',
      }]
    }]
  },
  {
    title: '商家管理',
    icon: IconUser,
    index: 'MANAGE',
    menuItems: [{
      index: 'merchant-manage',
      title: '关联商家',
      icon: IconMerchant,
      paths: [{
        name: '商家列表',
        path: '/merchants',
      }]
    }],
  },
]