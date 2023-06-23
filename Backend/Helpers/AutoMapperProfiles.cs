using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc.Rendering;
using Virta.Api.DTO;
using Virta.Entities;
using Virta.Models;

namespace Virta.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            #region User
            CreateMap<UserToRegister, User>()
                .ForMember(
                    dest => dest.UserName,
                    opt => opt.MapFrom(
                        src => src.Email
                    )
                );
            #endregion

            #region Attribute
            CreateMap<Attribute, AttributeDTO>();
            CreateMap<AttributeDTO, AttributeUpsert>();
            CreateMap<AttributeUpsert, Attribute>();
            CreateMap<AttributeDTO, Attribute>();
            #endregion

            #region Category
            CreateMap<Category, CategoryDTO>()
                .ForMember(
                    dest => dest.Children,
                    opt => opt.MapFrom(
                        src => src.Children
                    )
                )
                .ForMember(
                    dest => dest.Parent,
                    opt => opt.Ignore() // TODO: not ignore in the future
                );
            CreateMap<CategoryDTO, CategoryUpsert>();
            CreateMap<CategoryUpsert, Category>()
                .ForMember(
                    dest => dest.Parent,
                    opt => opt.Ignore()
                );

            CreateMap<Category, Virta.MVC.ViewModels.CategoryVM>();
            CreateMap<Category, SelectListItem>()
                .ForMember(
                    dest => dest.Text,
                    opt => opt.MapFrom(
                        src => src.Title
                    )
                );

            CreateMap<CategoryDTO, string>()
                .ConvertUsing(src => src.Name);
            #endregion

            #region Product
            CreateMap<ProductDTO, ProductUpsert>();
            CreateMap<ProductUpsert, Product>();
            CreateMap<Product, ProductDTO>()
                .ForMember(
                    dest => dest.Attributes,
                    opt => opt.MapFrom(
                        src => src.ProductAttributes
                    )
                )                .ForMember(
                    dest => dest.Reviews,
                    opt => opt.MapFrom(
                        src => src.Reviews.Count
                    )
                );

            CreateMap<string, Category>()
                .ForMember(
                    dest => dest.Name,
                    opt => opt.MapFrom(src => src)
                );

            CreateMap<System.Guid, Product>()
                .ForMember(
                    dest => dest.Id,
                    opt => opt.MapFrom(src => src)
                );
            #endregion

            # region Product Attributes
            CreateMap<ProductAttributeDTO, ProductAttributeUpsert>();
            CreateMap<ProductAttributeUpsert, ProductAttribute>();
            CreateMap<ProductAttribute, ProductAttributeDTO>()
                .ForMember(
                    dest => dest.Title,
                    opt => opt.MapFrom(src => src.Attribute.Title)
                );
            #endregion

            #region Product Images
            CreateMap<ProductImage, ProductImageDTO>();
            CreateMap<ProductImageDTO, ProductImageUpsert>();
            CreateMap<ProductImageUpsert, ProductImage>();
            #endregion

            #region Cart
            CreateMap<CartDTOIn, CartUpsert>();
            CreateMap<CartDTOIn.CartItemDTOIn, CartUpsert.CartItemUpsert>();

            CreateMap<CartUpsert, Cart>()
                .ForMember(
                    dest => dest.CartItems,
                    opt => opt.Ignore()
                );
            CreateMap<CartUpsert.CartItemUpsert, CartItem>();

            CreateMap<Cart, CartDTO>();
            CreateMap<CartItem, CartDTO.CartItemDTO>()
                .ForMember(
                    dest => dest.ProductId,
                    opt => opt.MapFrom(src => src.Product.Id)
                )
                .ForMember(
                    dest => dest.Title,
                    opt => opt.MapFrom(src => src.Product.Title)
                )
                .ForMember(
                    dest => dest.Price,
                    opt => opt.MapFrom(src => src.Product.Price)
                )
                .ForMember(
                    dest => dest.ImageUrl,
                    opt => opt.MapFrom(src => src.Product.Images.Where(i => i.Primary).FirstOrDefault().URL)
                )
                .ForMember(
                    dest => dest.Unit,
                    opt => opt.MapFrom(src => src.Product.Unit)
                );
            #endregion

            #region Wishlist
            CreateMap<WishlistDTOIn, WishlistUpsert>()
                .ForMember(
                    dest => dest.Products,
                    opt => opt.MapFrom(
                        src => src.ProductIds
                    )
                );
            CreateMap<System.Guid, WishlistUpsert.WishlistItemUpsert>()
                .ForMember(
                    dest => dest.ProductId,
                    opt => opt.MapFrom(src => src)
                );

            CreateMap<WishlistDTO, WishlistUpsert>();
            CreateMap<WishlistDTO.WishlistItemDTO, WishlistUpsert.WishlistItemUpsert>();

            CreateMap<WishlistUpsert, Wishlist>()
                .ForMember(
                    dest => dest.WishlistItems,
                    opt => opt.Ignore()
                );
            CreateMap<WishlistUpsert.WishlistItemUpsert, WishlistItem>();

            CreateMap<Wishlist, WishlistDTO>();
            CreateMap<WishlistItem, WishlistDTO.WishlistItemDTO>()
                .ForMember(
                    dest => dest.ProductId,
                    opt => opt.MapFrom(src => src.Product.Id)
                )
                .ForMember(
                    dest => dest.Title,
                    opt => opt.MapFrom(src => src.Product.Title)
                )
                .ForMember(
                    dest => dest.Price,
                    opt => opt.MapFrom(src => src.Product.Price)
                )
                .ForMember(
                    dest => dest.ImageUrl,
                    opt => opt.MapFrom(src => src.Product.Images.Where(i => i.Primary).FirstOrDefault().URL)
                )
                .ForMember(
                    dest => dest.Unit,
                    opt => opt.MapFrom(src => src.Product.Unit)
                );

            CreateMap<Wishlist, Wishlist>()
                .ForMember(
                    dest => dest.WishlistItems,
                    opt => opt.Ignore()
                );
            CreateMap<WishlistItem, WishlistItem>();
            #endregion

            /* From Product Entity */
            // CreateMap<Product, ProductPDP>()
            //     .ForMember(
            //         dest => dest.Images,
            //         opt => opt.MapFrom(
            //             src => JsonConvert.DeserializeObject<List<string>>(src.Images)
            //         ));

            // CreateMap<Product, ProductPLP>()
            //     .ForMember(
            //         dest => dest.Images,
            //         opt => opt.MapFrom(
            //             src => JsonConvert.DeserializeObject<List<string>>(src.Images).Take(1)
            //         )
            //     );

            // CreateMap<Product, ProductPLPVM>()
            //     .ForMember(
            //         dest => dest.Images,
            //         opt => opt.MapFrom(
            //             src => JsonConvert.DeserializeObject<List<string>>(src.Images).Take(1)
            //         )
            //     );

            // CreateMap<Product, ProductUpsertVM>();

            /* To Product Entity*/
            // CreateMap<ProductUpsert.ProductAttributes, ProductAttributes>();
            // CreateMap<ProductUpsert.Category, Category>();
            // /* TO Product Upsert */
            // //API
            // CreateMap<CategoryDTO, ProductUpsert.Category>();
            // CreateMap<ProductPDP, ProductUpsert>();
            // //MVC
            // CreateMap<ProductAttributesVM, ProductUpsert.ProductAttributes>();
            // CreateMap<SelectListItem, ProductUpsert.Category>();
            // CreateMap<ProductUpsertVM, ProductUpsert>();

            /* From Product Attributes Entity */
            // CreateMap<ProductAttributes, ProductAttributesDTO>();
            // CreateMap<ProductAttributes, Virta.MVC.ViewModels.ProductAttributesVM>();


            #region From Order Entity
            CreateMap<Order, OrderOutgoing>()
                .ForMember(
                    dest => dest.UserId,
                    opt => opt.MapFrom(
                        src => src.User.Id
                    )
                )
                .ForMember(
                    dest => dest.Products,
                    opt => opt.MapFrom(
                        src => src.OrderProduct
                    )
                );

            CreateMap<OrderProduct, OrderOutgoing.OrderProduct>()
                .ForMember(
                    dest => dest.OrderPrice,
                    opt => opt.MapFrom(
                        src => src.Price
                    )
                );
            #endregion

            #region TO Product Upsert
            CreateMap<OrderIncoming, OrderUpsert>();
            CreateMap<OrderIncoming.OrderProduct, OrderUpsert.OrderProduct>();
            #endregion

            #region Self
            CreateMap<Product, Product>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<Attribute, Attribute>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<Category, Category>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<Order, Order>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<Cart, Cart>()
                .ForMember(dest => dest.UserId, opt => opt.Ignore())
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<Wishlist, Wishlist>()
                .ForMember(dest => dest.UserId, opt => opt.Ignore())
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
            #endregion
        }
    }
}
