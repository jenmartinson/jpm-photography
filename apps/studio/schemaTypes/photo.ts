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
        name: 'feature',
        type: 'boolean',
        title: 'Feature on Homepage',
        initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'title', media: 'image', featured: 'feature' },
    prepare({ title, media, featured }) {
        return {
            title: title || 'Untitled Photo',
            subtitle: featured ? 'Featured on Homepage' : '',
            media,
        }
    }
},
})