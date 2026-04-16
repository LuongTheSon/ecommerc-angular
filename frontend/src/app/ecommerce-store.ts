import { computed, inject } from '@angular/core';
import { Product } from './models/product';
import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  patchState,
  signalMethod,
} from '@ngrx/signals';
import { produce } from 'immer';
import { Toaster } from './services/toaster';
import { cartItem } from './models/cart';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from './components/sign-in-dialog/sign-in-dialog';
import { signInParams, signUpParams, User } from './models/user';
import { Router } from '@angular/router';
import { order } from './models/order';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';

export type EcommerceState = {
  products: Product[];
  category: string;
  wishlistItems: Product[];
  cartItems: cartItem[];
  user: User | undefined;
  loading: boolean;
  selectProductId: string | undefined;
};

export const ecommerceStore = signalStore(
  {
    providedIn: 'root',
  },

  withState({
    products: [
      {
        id: '1',
        name: 'Coca-Cola Chai 390ml',
        price: 12000,
        description:
          'Coca-Cola vị nguyên bản, sảng khoái với từng ngụm. Thức uống có gas kinh điển được yêu thích toàn thế giới.',
        imageUrl: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&h=500&fit=crop',
        rating: 4.9,
        reviewsCount: 1420,
        inStock: true,
        category: 'Soft Drink',
      },
      {
        id: '2',
        name: 'Pepsi Lon 330ml',
        price: 10000,
        description: 'Pepsi Cola lon nhôm mát lạnh, vị cola đặc trưng với lớp bọt khí sảng khoái.',
        imageUrl:
          'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=500&h=500&fit=crop',
        rating: 4.7,
        reviewsCount: 986,
        inStock: true,
        category: 'Soft Drink',
      },
      {
        id: '3',
        name: 'Sprite Chanh Lon 330ml',
        price: 10000,
        description:
          'Sprite vị chanh tươi mát, không màu, không caffeine. Lựa chọn giải khát hàng đầu ngày nắng nóng.',
        imageUrl:
          'https://cdn.tgdd.vn/Products/Images/2443/85146/bhx/nuoc-ngot-sprite-huong-chanh-lon-320ml-202306200909131864.jpg',
        rating: 4.6,
        reviewsCount: 754,
        inStock: true,
        category: 'softDrink',
      },
      {
        id: '4',
        name: 'Sting Dâu Chai 330ml',
        price: 8500,
        description:
          'Sting Dâu vị ngọt thơm từ dâu tây, có gas nhẹ, bổ sung năng lượng tức thì cho ngày dài.',
        imageUrl:
          'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/3226/76520/bhx/nuoc-tang-luc-sting-dau-pet-330ml_202509291516185862.jpg',
        rating: 4.5,
        reviewsCount: 632,
        inStock: true,
        category: 'softDrink',
      },

      // ── Nước suối ────────────────────────────────────────────
      {
        id: '5',
        name: 'Aquafina Chai 500ml',
        price: 6000,
        description:
          'Nước tinh khiết Aquafina qua 7 bước lọc nghiêm ngặt, trong vắt và hoàn toàn tinh khiết.',
        imageUrl:
          'https://cdn.tgdd.vn/Products/Images/2563/84816/bhx/thung-24-chai-nuoc-tinh-khiet-aquafina-500ml-202407121620249226.jpg',
        rating: 4.8,
        reviewsCount: 2100,
        inStock: true,
        category: 'water',
      },
      {
        id: '6',
        name: 'LaVie Nước Khoáng 500ml',
        price: 7000,
        description:
          'Nước khoáng thiên nhiên LaVie từ nguồn mạch Đaklak, giàu khoáng chất tự nhiên tốt cho sức khoẻ.',
        imageUrl:
          'https://cdn.thegioididong.com/Products/Images/2563/76401/nuoc-khoang-la-vie-500ml-4.jpg',
        rating: 4.7,
        reviewsCount: 1830,
        inStock: true,
        category: 'water',
      },

      // ── Trà ──────────────────────────────────────────────────
      {
        id: '7',
        name: 'Trà Ô Long TEA+ Plus 455ml',
        price: 11000,
        description:
          'Trà ô long nguyên chất pha lạnh, không đường, thanh mát và nhẹ nhàng. Uống ngon hơn khi còn lạnh.',
        imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&h=500&fit=crop',
        rating: 4.6,
        reviewsCount: 891,
        inStock: true,
        category: 'tea',
      },
      {
        id: '8',
        name: 'C2 Trà Xanh Vị Chanh 360ml',
        price: 8000,
        description:
          'C2 trà xanh pha sẵn vị chanh tươi, thanh mát tự nhiên, ít calo phù hợp mọi lứa tuổi.',
        imageUrl:
          'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500&h=500&fit=crop',
        rating: 4.5,
        reviewsCount: 1205,
        inStock: true,
        category: 'tea',
      },
      {
        id: '9',
        name: 'Trà Đào Nestea 455ml',
        price: 10000,
        description:
          'Nestea trà đào vị ngọt thanh từ đào tươi, kết hợp trà đen đặc trưng, uống lạnh càng thêm ngon.',
        imageUrl:
          'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=500&h=500&fit=crop',
        rating: 4.4,
        reviewsCount: 567,
        inStock: false,
        category: 'tea',
      },
      {
        id: '10',
        name: 'Trà Sữa Olong Milk Tea 280ml',
        price: 15000,
        description:
          'Trà sữa ô long béo ngậy, thơm mùi trà đặc trưng pha cùng sữa tươi, tiện lợi uống mọi lúc mọi nơi.',
        imageUrl: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=500&h=500&fit=crop',
        rating: 4.8,
        reviewsCount: 1456,
        inStock: true,
        category: 'tea',
      },

      // ── Bia ──────────────────────────────────────────────────
      {
        id: '11',
        name: 'Heineken Lon 330ml',
        price: 25000,
        description:
          'Bia Heineken nhập khẩu Hà Lan, vị đắng nhẹ đặc trưng, độ cồn 5%, uống mát lạnh cực kỳ sảng khoái.',
        imageUrl:
          'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500&h=500&fit=crop',
        rating: 4.9,
        reviewsCount: 3200,
        inStock: true,
        category: 'beer',
      },
      {
        id: '12',
        name: 'Tiger Beer Lon 330ml',
        price: 20000,
        description:
          'Tiger Beer vị lager nhẹ nhàng, uống mát lạnh đặc biệt, thương hiệu bia châu Á nổi tiếng toàn cầu.',
        imageUrl:
          'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=500&h=500&fit=crop',
        rating: 4.7,
        reviewsCount: 2780,
        inStock: true,
        category: 'beer',
      },
    ],
    category: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
    selectProductId: undefined,
  } as EcommerceState),

  withStorageSync({
    key: 'modern-store',
    select: ({ wishlistItems, cartItems, user }) => ({ wishlistItems, cartItems, user }),
  }),

  withComputed(({ category, products, wishlistItems, cartItems, selectProductId }) => ({
    filteredProducts: computed(() => {
      const selectedCategory = category().toLowerCase();
      if (selectedCategory === 'all') {
        return products();
      }
      return products().filter((product) => product.category.toLowerCase() === selectedCategory);
    }),

    selectedProduct: computed(() => products().find((product) => product.id === selectProductId())),

    wishlistCount: computed(() => wishlistItems().length),

    cartCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),
  })),

  withMethods(
    (store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) => ({
      // Change the product category filter
      setCategory: signalMethod<string>((category: string) => {
        patchState(store, { category });
      }),

      // Select a product to view details
      setProductId: signalMethod<string>((productId: string) => {
        patchState(store, { selectProductId: productId });
      }),

      // Add a product to the wishlist
      addToWishlist: (product: Product) => {
        const updateWishlistItem = produce(store.wishlistItems(), (draft) => {
          if (!draft.find((p) => p.id === product.id)) {
            draft.push(product);
          }
        });

        patchState(store, { wishlistItems: updateWishlistItem });
        toaster.success('Product added to wishlist');
      },

      // Remove a product from the wishlist
      removeFromWishlist: (product: Product) => {
        patchState(store, {
          wishlistItems: store.wishlistItems().filter((p) => p.id !== product.id),
        });
        toaster.success('Product removed from wishlist');
      },

      // Remove all products from the wishlist
      clearWishlist: () => {
        patchState(store, { wishlistItems: [] });
        toaster.success('Wishlist cleared');
      },

      // Add a product to the shopping cart
      addToCart: (product: Product, quantity = 1) => {
        const existingItemIndex = store
          .cartItems()
          .findIndex((item) => item.product.id === product.id);

        const updatedCartItems = produce(store.cartItems(), (draft) => {
          if (existingItemIndex !== -1) {
            draft[existingItemIndex].quantity += quantity;
            return;
          }

          draft.push({ product, quantity });
        });

        patchState(store, { cartItems: updatedCartItems });
        toaster.success(existingItemIndex ? 'Product added again' : 'Product added to cart');
      },

      // Set the quantity of a product in the cart
      setItemQuantity: (params: { product: Product; quantity: number }) => {
        const index = store.cartItems().findIndex((item) => item.product.id === params.product.id);
        const updated = produce(store.cartItems(), (draft) => {
          if (index !== -1) {
            draft[index].quantity = params.quantity;
          }
        });
        patchState(store, { cartItems: updated });
      },

      // Remove a product from the shopping cart
      removeItemFromCart: (product: Product) => {
        patchState(store, {
          cartItems: store.cartItems().filter((item) => item.product.id !== product.id),
        });
        toaster.success('Product removed from cart');
      },

      // Proceed to checkout
      proceedToCheckout: () => {
        if (!store.user()) {
          matDialog.open(SignInDialog, {
            disableClose: true,
            data: {
              checkout: true,
            },
          });
          return;
        }

        router.navigate(['/checkout']);
      },

      // Create an order from the cart items
      placeOrder: async () => {
        patchState(store, { loading: true });

        const user = store.user();

        if (!user) {
          toaster.error('Please sign in to place an order');
          patchState(store, { loading: false });
          return;
        }

        const order: order = {
          id: crypto.randomUUID(),
          userId: user.id,
          total: Math.round(
            store.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0),
          ),
          items: store.cartItems(),
          paymentStatus: 'success',
        };

        await new Promise((resolve) => setTimeout(resolve, 1000));

        patchState(store, { loading: false, cartItems: [] });
        router.navigate(['/order-success']);
      },

      // Sign in user with email and password
      signIn: ({ email, password, checkout, dialogId }: signInParams) => {
        patchState(store, {
          user: {
            id: '1',
            email,
            name: 'Son Luong',
            imageUrl:
              'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },

      // Create a new user account
      signUp: ({ name, email, password, checkout, dialogId }: signUpParams) => {
        patchState(store, {
          user: {
            id: '1',
            email,
            name: 'test user',
            imageUrl:
              'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },

      // Log out the current user
      signOut: () => {
        patchState(store, { user: undefined });
      },
    }),
  ),
);
