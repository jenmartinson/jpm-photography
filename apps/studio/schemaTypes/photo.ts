import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons/Image'

export const photoType = defineType({
  name: 'photo',
  title: 'Photo',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),    
    defineField({
      name: 'image',
      title: 'Gallery Image',
      type: 'image',
      options: { hotspot: true }, 
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for accessibility and SEO.',
          hidden: true,
        })
      ]
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Up to three stars. Higher-rated photos appear first in the gallery.',
      options: {
        list: [
          { title: '★', value: 1 },
          { title: '★★', value: 2 },
          { title: '★★★', value: 3 },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (Rule) => Rule.min(1).max(3).integer(),
    }),
    defineField({
        name: 'feature',
        type: 'boolean',
        title: 'Feature on Homepage',
        initialValue: false,
    }),    
  ],
  preview: {
    select: { title: 'title', media: 'image', featured: 'feature', rating: 'rating' },
    prepare({ title, media, featured, rating }) {
        return {
            title: title || 'Untitled Photo',
            subtitle: [rating ? '★'.repeat(rating) : '', featured ? 'Featured on Homepage' : '']
              .filter(Boolean)
              .join(' · '),
            media,
        }
    }
},
})