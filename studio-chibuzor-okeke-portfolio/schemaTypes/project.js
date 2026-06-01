// studio/schemaTypes/project.js
export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'timeline',
      title: 'Timeline',
      type: 'string', // e.g. "2023 - 2024"
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
    },
    {
      name: 'servicesRendered',
      title: 'Services Rendered',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              {title: 'Design', value: 'design'},
              {title: 'Development', value: 'development'},
              {title: 'Strategy', value: 'strategy'},
            ],
          },
        },
      ],
    },
    {
      name: 'span',
      title: 'Grid Span',
      type: 'number', // 1, 2, 3, 4
    },
    {
      name: 'versions',
      title: 'Versions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', type: 'string'}, // "Mobile" or "Web"
            {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
            {name: 'href', title: 'Link (optional)', type: 'url'},
          ],
        },
      ],
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
}
