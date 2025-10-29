'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useUpdateUser } from '@/features/users/hooks/use-update-user'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { transformedUserProfileSchema, UserProfileFormInput, userProfileSchema } from '@/features/users/schemas/user'
import { Spinner } from '@/components/ui/spinner'

/* ----------------------------- MAIN PAGE ----------------------------- */
export default function Edit() {
  return (
    <div className="flex flex-col items-center w-full min-h-svh">
      <TopBar />
      <h2 className="text-2xl font-semibold my-4">Edit Profile</h2>
      <ProfileForm />
    </div>
  )
}

/* ----------------------------- TOP BAR ----------------------------- */
const TopBar = () => (
  <div className="flex items-center justify-center w-full bg-neutral-800 py-4">
    <div className="container px-4 flex items-center justify-between">
      <Link href="/profile" className="cursor-pointer text-white">
        <ArrowLeft />
      </Link>
    </div>
  </div>
)

/* ----------------------------- PROFILE FORM ----------------------------- */
function ProfileForm() {
    const { mutate, isPending } = useUpdateUser()

    const form = useForm<UserProfileFormInput>({
        resolver: zodResolver(userProfileSchema),
        defaultValues: {
        bodyWeight: "75",
        bodyHeight: "180",
        bodyFat: "15",
        weightUnit: "kg",
        measurementsUnit: "cm",
        },
    })

    function onSubmit(values: UserProfileFormInput) {
        const parsed = transformedUserProfileSchema.parse(values)
        mutate(parsed)
    }

    const formNormalFields: {
        name: keyof UserProfileFormInput
        label: string
        type: string
        }[] = [
        { name: "bodyWeight", label: "Body Weight", type: "number" },
        { name: "bodyHeight", label: "Body Height", type: "number" },
        { name: "bodyFat", label: "Body Fat %", type: "number" },
    ]
    const formSelectFields: {
        name: keyof UserProfileFormInput
        label: string
        options: { label: string; value: string }[]
        }[] = [
        { name: "weightUnit", label: "Weight Unit", options: [
        { label: 'Kilograms (kg)', value: 'kg' },
        { label: 'Pounds (lb)', value: 'lb' },
      ], },
        { name: "measurementsUnit", label: "Measurements Unit", options: [
        { label: 'Centimeters (cm)', value: 'cm' },
        { label: 'Inches (in)', value: 'in' },
      ], },
    ]

    return (
        <div className="container max-w-2xl px-4 flex flex-col items-center">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
            <div className='flex flex-col items-center w-full gap-4'>
                {formNormalFields.map((fieldInfo) => (
                <FormField
                    key={fieldInfo.name}
                    control={form.control}
                    name={fieldInfo.name}
                    render={({ field }) => (
                    <FormItem className='w-full'>
                        <FormLabel className='font-semibold'>{fieldInfo.label}</FormLabel>
                        <FormControl>
                            <Input type={fieldInfo.type} {...field} className='bg-neutral-800 border-neutral-600'/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                ))}
                
                {formSelectFields.map((fieldInfo) => (
                <FormField
                    key={fieldInfo.name}
                    control={form.control}
                    name={fieldInfo.name}
                    render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel className="font-semibold">
                            {fieldInfo.label}
                        </FormLabel>
                        <FormControl>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <SelectTrigger className="bg-neutral-800 border-neutral-600 w-full cursor-pointer">
                                    <SelectValue placeholder={`Select ${fieldInfo.label}`} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>{fieldInfo.label}</SelectLabel>
                                        {fieldInfo.options.map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value} className='cursor-pointer'>
                                            {opt.label}
                                        </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                ))}

                <Button type="submit" disabled={isPending} className="w-full mt-3">
                    {isPending ? <span className='flex items-center gap-2'><Spinner /> Saving...</span> : <span>Save Changes</span>}
                </Button>
            </div>
            </form>
        </Form>
        </div>
    )
}