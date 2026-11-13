import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };


type PickContentRelationshipFieldData<
	TRelationship extends prismic.CustomTypeModelFetchCustomTypeLevel1 | prismic.CustomTypeModelFetchCustomTypeLevel2 | prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2,
	TData extends Record<string, prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone>,
	TLang extends string
> = |
	// Content relationship fields
	{
		[TSubRelationship in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchContentRelationshipLevel1
		> as TSubRelationship["id"]]:
			ContentRelationshipFieldWithData<TSubRelationship["customtypes"], TLang>;
	} &
	// Group
	{
		[TGroup in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2
		> as TGroup["id"]]:
			TData[TGroup["id"]] extends prismic.GroupField<infer TGroupData>
				? prismic.GroupField<PickContentRelationshipFieldData<TGroup, TGroupData, TLang>>
				: never
	} &
	// Other fields
	{
		[TFieldKey in Extract<TRelationship["fields"][number], string>]:
			TFieldKey extends keyof TData ? TData[TFieldKey] : never;
	};

type ContentRelationshipFieldWithData<
	TCustomType extends readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[] | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
	TLang extends string = string
> = {
	[ID in Exclude<TCustomType[number], string>["id"]]:
		prismic.ContentRelationshipField<
			ID,
			TLang,
			PickContentRelationshipFieldData<
				Extract<TCustomType[number], { id: ID }>,
				Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
				TLang
			>
		>
}[Exclude<TCustomType[number], string>["id"]];

/**
 * Item in *Landing Images → Learner avatars (hero uses the first 3, final CTA uses 4)*
 */
export interface LandingImagesDocumentDataLearnerAvatarsItem {
	/**
	 * Avatar field in *Landing Images → Learner avatars (hero uses the first 3, final CTA uses 4)*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: landing_images.learner_avatars[].avatar
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	avatar: prismic.ImageField<never>;
}

/**
 * Item in *Landing Images → People gallery (10 photos, column order)*
 */
export interface LandingImagesDocumentDataPeopleGalleryItem {
	/**
	 * Photo field in *Landing Images → People gallery (10 photos, column order)*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: landing_images.people_gallery[].photo
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	photo: prismic.ImageField<never>;
}

/**
 * Content for Landing Images documents
 */
interface LandingImagesDocumentData {
	/**
	 * Hero image field in *Landing Images*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: landing_images.hero_image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	hero_image: prismic.ImageField<never>;
	
	/**
	 * Featured course image field in *Landing Images*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: landing_images.featured_course_image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	featured_course_image: prismic.ImageField<never>;
	
	/**
	 * Testimonial avatar field in *Landing Images*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: landing_images.testimonial_avatar
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	testimonial_avatar: prismic.ImageField<never>;
	
	/**
	 * Learner avatars (hero uses the first 3, final CTA uses 4) field in *Landing Images*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: landing_images.learner_avatars[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	learner_avatars: prismic.GroupField<Simplify<LandingImagesDocumentDataLearnerAvatarsItem>>;
	
	/**
	 * People gallery (10 photos, column order) field in *Landing Images*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: landing_images.people_gallery[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	people_gallery: prismic.GroupField<Simplify<LandingImagesDocumentDataPeopleGalleryItem>>;
}

/**
 * Landing Images document from Prismic
 *
 * - **API ID**: `landing_images`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type LandingImagesDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<LandingImagesDocumentData>, "landing_images", Lang>;

export type AllDocumentTypes = LandingImagesDocument;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
	}
	
	interface CreateMigration {
		(): prismic.Migration<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			LandingImagesDocument,
			LandingImagesDocumentData,
			LandingImagesDocumentDataLearnerAvatarsItem,
			LandingImagesDocumentDataPeopleGalleryItem,
			AllDocumentTypes
		}
	}
}