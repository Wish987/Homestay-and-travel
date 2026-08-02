import { Button, Input } from "./ui";

export default function HomestayForm({ values, errors, onChange, onSubmit, submitLabel, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        label="Homestay Name"
        placeholder="Enter place name"
        value={values.name}
        onChange={(e) => onChange("name", e.target.value)}
        error={errors.name}
      />
      <Input
        label="Location"
        placeholder="Enter location"
        value={values.location}
        onChange={(e) => onChange("location", e.target.value)}
        error={errors.location}
      />
      <Input
        label="Price Per Night"
        type="number"
        placeholder="Enter price"
        value={values.price}
        onChange={(e) => onChange("price", e.target.value)}
        error={errors.price}
      />
      <Input
        label="Image URL"
        placeholder="Enter image URL"
        value={values.image}
        onChange={(e) => onChange("image", e.target.value)}
        error={errors.image}
      />
      <div className="flex flex-wrap gap-4 items-center mt-2">
        <Button type="submit" variant="primary" size="md">
          {submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" size="md" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
