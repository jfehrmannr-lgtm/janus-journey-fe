import React from 'react'
import { imageOptions } from './imageOptions'
import Dropdown from '@/components/Dropdown/Dropdown'
import Input from '@/components/Input/Input'
import Icon from '@/components/Icon/Icon'
import { useCreateJourneyForm } from '@/stores/workspaceFromStore'

const CreateJourneyFormSelectImage = () => {
  const { setCreateJourneyForm, createJourneyForm } = useCreateJourneyForm((state) => state)

  return (
    <Dropdown
      id="select-background"
      trigger={
        <Input
          size={10000}
          onChange={() => false}
          value={imageOptions.find((imageOptionElement) => imageOptionElement.path === createJourneyForm.imgUrl)?.label}
          icon={<Icon icon="CompassOutlined" />}
        />
      }
      width={900}
      placement="top-end"
    >
      <div className="p-4">
        <div className="pb-2 text-2xl font-bold">Journey Background</div>
        <div className=" flex items-center justify-center">
          <div className="grid grid-cols-4 gap-4 ">
            {imageOptions.map((imageOptionElement) => {
              return (
                <button
                  className={`cursor-pointer w-50 border hover:border-primary/60 p-2 rounded-lg transition ${createJourneyForm.imgUrl === imageOptionElement.path ? 'border-primary' : 'border-white'}`}
                  key={imageOptionElement.path}
                  onClick={() => setCreateJourneyForm({ ...createJourneyForm, imgUrl: imageOptionElement.path })}
                >
                  <img src={imageOptionElement.path} />
                  <div>{imageOptionElement.label}</div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </Dropdown>
  )
}

export default CreateJourneyFormSelectImage
