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
                    opt => opt.MapFrom(
                        src => src.Parent.Id
                    )
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
            CreateMap<CartDTO, CartUpsert>();
            CreateMap<CartDTO.CartItemDTO, CartUpsert.CartItemUpsert>();

            CreateMap<CartUpsert, Cart>();
            CreateMap<CartUpsert.CartItemUpsert, Cart.CartItem>();

            CreateMap<Cart, CartDTO>();
            CreateMap<Cart.CartItem, CartDTO.CartItemDTO>();
            #endregion

            #region Wishlist
            CreateMap<WishlistDTO, WishlistUpsert>();
            CreateMap<WishlistDTO.WishlistItemDTO, WishlistUpsert.WishlistItemUpsert>();

            CreateMap<WishlistUpsert, Wishlist>();
            CreateMap<WishlistUpsert.WishlistItemUpsert, Wishlist.WishlistItem>();

            CreateMap<Wishlist, WishlistDTO>();
            CreateMap<Wishlist.WishlistItem, WishlistDTO.WishlistItemDTO>();
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
            #endregion
        }
    }
}
